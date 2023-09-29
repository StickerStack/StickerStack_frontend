import { FC, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import cn from 'classnames';

import { updateSticker } from '../../shared/store/stickersSlice';
import { stickertext } from '../../assets/static/stickerspage';
import { Error } from '../UI';
import { useAppDispatch } from '../../shared/hooks/hooks';
import { converter } from '../../utils/converter';
import { SIZE_INPUT_MAX_LENGTH, stickerWhiteBorder } from '../../utils/constants';
import { ISticker } from '../../shared/interfaces/ISticker';
import { PicOverlay } from '../PicOverlay/PicOverlay';
import { StickerImage } from '../StickerImage/StickerImage';

import styles from './DragAndDrop.module.scss';

interface IProps {
  sticker: ISticker;
  className?: string;
  register?: UseFormRegister<FieldValues>;
  name?: string;
}

type TFile = {
  file: File;
  urlFilePreview: string | ArrayBuffer | null;
} | null;

export const DragAndDrop: FC<IProps> = ({ sticker, className, register, name }) => {
  const [error, setError] = useState(false);

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const maxSize = converter.cmToPx(SIZE_INPUT_MAX_LENGTH);

  const dispatch = useAppDispatch();

  const getImageUrl = (url: string) => {
    if (url.startsWith('data:image')) {
      if (url.startsWith('data:image/png')) {
        return url.replace('data:image/png;base64,', '');
      }

      if (url.startsWith('data:image/jpeg')) {
        return url.replace('data:image/jpeg;base64,', '');
      }

      if (url.startsWith('data:image/jpg')) {
        return url.replace('data:image/jpg;base64,', '');
      }
    } else return url;
  };

  const handleImageCahnge = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (files) {
      if (!allowedTypeFile.includes(files[0].type)) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = () => {
        const file: TFile = {
          file: files[0],
          urlFilePreview: reader.result,
        };

        if (file.file.size >= 1000000) {
          setError(true);
          return;
        }

        setError(false);
        if (typeof reader.result === 'string') {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            if (typeof file.urlFilePreview === 'string') {
              // Прибавляем к окончательной картинке в оптимальном размере ширину белых полей
              const optimalWidth =
                Math.round(converter.pxToOptimalCm(image.naturalWidth)) + (stickerWhiteBorder * 2) / 10;
              const optimalHeight =
                Math.round(converter.pxToOptimalCm(image.naturalHeight)) + (stickerWhiteBorder * 2) / 10;

              if (optimalWidth <= maxSize && optimalHeight <= maxSize) {
                dispatch(
                  updateSticker({
                    ...sticker,
                    image: getImageUrl(file.urlFilePreview),
                    width: optimalWidth,
                    height: optimalHeight,
                    optimal_width: optimalWidth,
                    optimal_height: optimalHeight,
                  }),
                );
              } else {
                if (optimalWidth > optimalHeight) {
                  dispatch(
                    updateSticker({
                      ...sticker,
                      image: getImageUrl(file.urlFilePreview),
                      width: maxSize,
                      height: (optimalHeight / optimalWidth) * maxSize,
                      optimal_width: maxSize,
                      optimal_height: (optimalHeight / optimalWidth) * maxSize,
                    }),
                  );
                } else {
                  dispatch(
                    updateSticker({
                      ...sticker,
                      image: getImageUrl(file.urlFilePreview),
                      width: (optimalWidth / optimalHeight) * maxSize,
                      height: maxSize,
                      optimal_width: (optimalWidth / optimalHeight) * maxSize,
                      optimal_height: maxSize,
                    }),
                  );
                }
              }
            }
          };
        }
      };
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      {sticker.image ? (
        <StickerImage sticker={sticker} boxWidth={255} boxHeight={262} />
      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>{stickertext.image}</span>
            <span className={styles.sub}>{stickertext.imageFormat}</span>
          </div>
        </div>
      )}
      {name && (
        <input
          {...(register && register(name))}
          name={name}
          className={styles.input}
          type='file'
          id='stickerFile'
          onChange={handleImageCahnge}
          accept='.jpg, .jpeg, .png'
        />
      )}
      {sticker.image && <PicOverlay className={styles.overlay} label='stickerFile' />}
      {error && <Error className={styles.error}>{stickertext.errorImageSize}</Error>}
    </div>
  );
};
