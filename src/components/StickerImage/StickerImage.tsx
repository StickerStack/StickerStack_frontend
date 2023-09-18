import { FC } from 'react';
import cn from 'classnames';

import { stickerWhiteBorder } from '../../utils/constants';
import { ISticker } from '../../interfaces/ISticker';

import styles from './StickerImage.module.scss';

interface IProps {
  sticker: ISticker;
  boxWidth: number;
  boxHeight: number;
  className?: string;
  shadow?: boolean;
}

export const StickerImage: FC<IProps> = ({
  sticker,
  boxWidth,
  boxHeight,
  className,
  shadow = true,
}) => {
  const styleBorderImage = {
    width:
      sticker.width / sticker.height >= 1 ? boxWidth : (sticker.width / sticker.height) * boxWidth,
    height:
      sticker.height / sticker.width >= 1
        ? boxHeight
        : (sticker.height / sticker.width) * boxHeight,
    padding: (stickerWhiteBorder * 10) / sticker.width,
  };

  return (
    <div
      className={cn(
        styles.border,
        styles[`border_${sticker.shape}`],
        !sticker.image && styles.empty,
        className,
        !shadow && styles.no_shadow,
      )}
      style={styleBorderImage}
    >
      {sticker.image ? (
        <img
          className={cn(styles.image, styles[`image_${sticker.shape}`])}
          alt='Загруженное изображение'
          src={`data:image/png;base64,${sticker.image}`}
        />
      ) : (
        <div className={styles.empty} />
      )}
    </div>
  );
};
