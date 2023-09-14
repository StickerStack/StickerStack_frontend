import { FC, useState } from 'react';
import cn from 'classnames';

import { updateSticker } from '../../store/stickersSlice';
import { stickertext } from '../../utils/content/stickerspage';
import { Error } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { converter } from '../../utils/converter';
import { stickerWhiteBorder } from '../../utils/constants';
import { ISticker } from '../../interfaces/ISticker-new';
import { PicOverlay } from '../PicOverlay/PicOverlay';
import styles from './DragAndDrop.module.scss';

interface IProps {
  sticker: ISticker;
}

type TFile = {
  file: File;
  urlFilePreview: string | ArrayBuffer | null;
} | null;

export const DragAndDrop: FC<IProps> = ({ sticker }) => {
  const [error, setError] = useState(false);

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const borderInPx = converter.mmToPx(stickerWhiteBorder);
  const styleBorderImage = {
    width: sticker.width / sticker.height >= 1 ? 255 : (sticker.width / sticker.height) * 255,
    height: sticker.height / sticker.width >= 1 ? 262 : (sticker.height / sticker.width) * 262,
    padding: borderInPx / sticker.width,
  };

  const dispatch = useAppDispatch();

  const removeImageUrl = (url: string) => {
    if (url.startsWith('data:image')) {
      if(url.startsWith('data:image/png')) {
        return url.replace('data:image/png;base64,', '');
      }

      if(url.startsWith('data:image/jpeg')) {
        return url.replace('data:image/jpeg;base64,', '');
      }

      if(url.startsWith('data:image/jpg')) {
        return url.replace('data:image/jpg;base64,', '');
      }
    }

    return url;
  }

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
              const optimalWidth = Math.round(converter.pxToOptimalPx(image.naturalWidth));
              const optimalHeight = Math.round(converter.pxToOptimalPx(image.naturalHeight));
              // TODO: ЗДесь логика сохранения данных в стейте!

              dispatch(
                updateSticker({
                  ...sticker,
                  image: removeImageUrl(file.urlFilePreview),
                  optimal_width: optimalWidth,
                  optimal_height: optimalHeight,
                })
              );
            }
          };
        }
      };
    }
  };

  return (
    <div className={styles.container}>
      {sticker.image ? (
        <div className={cn(styles.border, styles[`border_${sticker.shape}`])} style={styleBorderImage}>
          <img
            className={cn(styles.image, styles[`image_${sticker.shape}`])}
            alt='Загруженное изображение'
            src={`data:image/png;base64,${sticker.image}`}
          />
        </div>
      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>{stickertext.image}</span>
            <span className={styles.sub}>{stickertext.imageFormat}</span>
          </div>
        </div>
      )}
      <input
        className={styles.input}
        type='file'
        id='stickerFile'
        onChange={handleImageCahnge}
        accept='.jpg, .jpeg, .png'
      />
      {sticker.image && <PicOverlay className={styles.overlay} label='stickerFile' />}
      {error && <Error className={styles.error}>{stickertext.errorImageSize}</Error>}
    </div>
  );
};
