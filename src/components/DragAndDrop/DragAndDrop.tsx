import { useState } from 'react';

import { ImagePick } from '../ImagePick/ImagePick';
import { ICard } from '../../interfaces';
import { useAppDispatch } from '../../hooks/hooks';
import { updatePicture } from '../../store/cardsSlice';
import styles from './DragAndDrop.module.scss';

interface IProps {
  card: ICard;
  onLoad?: () => void;
}

const DragAndDrop: React.FC<IProps> = ({ card, onLoad }: IProps) => {
  type TFile = {
    file: File;
    urlFilePreview: string | ArrayBuffer | null;
  } | null;

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const [imageFile, setImageFile] = useState<TFile>(null);

  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const file = {
          file: files[0],
          urlFilePreview: reader.result,
        };
        setImageFile(file);

        if (typeof file.urlFilePreview === 'string') {
          dispatch(updatePicture({ id: card.id, image: file.urlFilePreview }));
        }
      };
    }
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div className={styles.container}>
      {card.image ? (
        <ImagePick
          onLoadImage={handleImageChange}
          deleteImage={() => setImageFile(null)}
          image={card.image}
        />
      ) : imageFile ? (
        <ImagePick
          onLoadImage={handleImageChange}
          deleteImage={() => setImageFile(null)}
          image={imageFile.urlFilePreview}
        />
      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>Перетащите фото или выберите файл</span>
            <span className={styles.sub}>Допустимые форматы: .jpg, .jpeg, .png</span>
          </div>
          <input
            className={styles.input}
            type='file'
            onChange={handleImageChange}
            accept='.jpg, .jpeg, .png'
          />
        </div>
      )}
    </div>
  );
};

export { DragAndDrop };
