import { useState } from 'react';
import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';
import cn from 'classnames';

import { SIZE_INPUT_MAX_LENGTH, stickerWhiteBorder } from '../../utils/constants';
import { converter } from '../../utils/converter';
import { PicOverlay } from '../PicOverlay/PicOverlay';
import { Error } from '../UI';
import { ICard } from '../../interfaces';
import { useAppDispatch } from '../../hooks/hooks';
import { updatePicture } from '../../store/cardsSlice';
import { openMessage } from '../../store/popupSlice';

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

  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  const maxSize = converter.cmToPx(SIZE_INPUT_MAX_LENGTH);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const file: TFile = {
          file: files[0],
          urlFilePreview: reader.result,
        };
        if (file.file.size < 1000000) {
          setError(false);
          if (typeof reader.result === 'string') {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
              if (typeof file.urlFilePreview === 'string') {
                if (image.naturalWidth <= maxSize && image.naturalHeight <= maxSize) {
                  dispatch(
                    updatePicture({
                      id: card.id,
                      image: file.urlFilePreview,
                      size: { width: image.naturalWidth, height: image.naturalHeight },
                      optimalSize: { width: image.naturalWidth, height: image.naturalHeight },
                    }),
                  );
                } else {
                  if (image.naturalWidth > image.naturalHeight) {
                    dispatch(
                      updatePicture({
                        id: card.id,
                        image: file.urlFilePreview,
                        size: {
                          width: maxSize,
                          height: (image.naturalHeight / image.naturalWidth) * maxSize,
                        },
                        optimalSize: {
                          width: maxSize,
                          height: (image.naturalHeight / image.naturalWidth) * maxSize,
                        },
                      }),
                    );
                  } else {
                    dispatch(
                      updatePicture({
                        id: card.id,
                        image: file.urlFilePreview,
                        size: {
                          width: (image.naturalWidth / image.naturalHeight) * maxSize,
                          height: maxSize,
                        },
                        optimalSize: {
                          width: (image.naturalWidth / image.naturalHeight) * maxSize,
                          height: maxSize,
                        },
                      }),
                    );
                  }
                }
              }
            };
          }
        } else {
          setError(true);
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
        <div
          className={cn(styles.border, styles[`border_${card.shape}`])}
          style={{
            width:
              card.size.width / card.size.height >= 1
                ? 255
                : (card.size.width / card.size.height) * 255,
            height:
              card.size.height / card.size.width >= 1
                ? 262
                : (card.size.height / card.size.width) * 262,
            padding: (borderInPx / card.size.width) * 255,
          }}
        >
          <img
            className={cn(styles.image, styles[`image_${card.shape}`])}
            alt='Загруженное изображение'
            src={`${card.image}`}
          />
        </div>
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
        id='stickerFile'
        onChange={handleImageChange}
        accept='.jpg, .jpeg, .png'
      />
      {card.image && (
        <PicOverlay
          className={styles.overlay}
          onLoadImage={handleImageChange}
          label='stickerFile'
        />
      )}
      {error && (
        <Error className={styles.error}>Максимально допустимый размер картинки - до 1Мб!</Error>
      )}
    </div>
  );
};

export { DragAndDrop };
