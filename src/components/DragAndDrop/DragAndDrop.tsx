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
import { sticker } from '../../utils/content/stickerspage';

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
                const optimalWidth = Math.round(converter.pxToOptimalPx(image.naturalWidth));
                const optimalHeight = Math.round(converter.pxToOptimalPx(image.naturalHeight));

                if (optimalWidth <= maxSize && optimalHeight <= maxSize) {
                  dispatch(
                    updatePicture({
                      id: card.id,
                      image: file.urlFilePreview,
                      size: { width: optimalWidth, height: optimalHeight },
                      optimalSize: { width: optimalWidth, height: optimalHeight },
                    }),
                  );
                } else {
                  if (optimalWidth > optimalHeight) {
                    dispatch(
                      updatePicture({
                        id: card.id,
                        image: file.urlFilePreview,
                        size: {
                          width: maxSize,
                          height: (optimalHeight / optimalWidth) * maxSize,
                        },
                        optimalSize: {
                          width: maxSize,
                          height: (optimalHeight / optimalWidth) * maxSize,
                        },
                      }),
                    );
                  } else {
                    dispatch(
                      updatePicture({
                        id: card.id,
                        image: file.urlFilePreview,
                        size: {
                          width: (optimalWidth / optimalHeight) * maxSize,
                          height: maxSize,
                        },
                        optimalSize: {
                          width: (optimalWidth / optimalHeight) * maxSize,
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
            padding: (borderInPx / card.size.width) * 262,
          }}
        >
          <img
            className={cn(styles.image, styles[`image_${card.shape}`])}
            alt='Загруженное изображение'
            src={
              card.image.startsWith('data:image/png;base64,')
                ? `${card.image}`
                : `data:image/png;base64,${card.image}`
            }
          />
        </div>
      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>{sticker.image}</span>
            <span className={styles.sub}>{sticker.imageFormat}</span>
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
      {error && <Error className={styles.error}>{sticker.errorImageSize}</Error>}
    </div>
  );
};

export { DragAndDrop };
