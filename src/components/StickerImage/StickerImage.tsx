import { FC, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks/hooks';

import { SIZE_INPUT_MAX_LENGTH, stickerWhiteBorder } from '../../utils/constants';
import { ISticker } from '../../interfaces/ISticker-new';

import styles from './StickerImage.module.scss';

interface IProps {
  sticker: ISticker;
  boxWidth: number;
  boxHeight: number;
  className?: string;
}

export const StickerImage: FC<IProps> = ({ sticker, boxWidth, boxHeight, className }) => {
  const styleBorderImage = {
    width:
      sticker.width / sticker.height >= 1 ? boxWidth : (sticker.width / sticker.height) * boxWidth,
    height:
      sticker.height / sticker.width >= 1
        ? boxHeight
        : (sticker.height / sticker.width) * boxHeight,
    padding: (stickerWhiteBorder * 10) / sticker.width,
  };

  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        styles.border,
        styles[`border_${sticker.shape}`],
        !sticker.image && styles.empty,
        className,
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
