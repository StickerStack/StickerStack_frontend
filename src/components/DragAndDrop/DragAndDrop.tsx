import { useState } from 'react';
import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';

import { ImagePick } from '../ImagePick/ImagePick';
import { ICard } from '../../interfaces';
import { useAppDispatch } from '../../hooks/hooks';
import { updatePicture } from '../../store/cardsSlice';
import { converter } from '../../utils/converter';

import styles from './DragAndDrop.module.scss';

interface IProps {
  card: ICard;
  name: string;
  option?: RegisterOptions;
  register?: UseFormRegister<FieldValues>;
  onLoad?: () => void;
}

const DragAndDrop: React.FC<IProps> = ({ card, name, option, register, onLoad }: IProps) => {
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

        if (typeof reader.result === 'string') {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            if (typeof file.urlFilePreview === 'string') {
              dispatch(
                updatePicture({
                  id: card.id,
                  image: file.urlFilePreview,
                  size: { width: image.naturalWidth, height: image.naturalHeight },
                  optimalSize: { width: image.naturalWidth, height: image.naturalHeight },
                }),
              );
            }
          };
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
          shape={card.shape}
        />
      ) : imageFile ? (
        <ImagePick
          onLoadImage={handleImageChange}
          deleteImage={() => setImageFile(null)}
          image={imageFile.urlFilePreview}
          shape={card.shape}
        />
      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>Перетащите фото или выберите файл</span>
            <span className={styles.sub}>Допустимые форматы: .jpg, .jpeg, .png</span>
          </div>
        </div>
      )}
      <input
        {...(register && register(name, option))}
        className={styles.input}
        type='file'
        onChange={handleImageChange}
        accept='.jpg, .jpeg, .png'
      />
    </div>
  );
};

export { DragAndDrop };
