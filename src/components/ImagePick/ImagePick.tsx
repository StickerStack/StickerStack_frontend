import cn from 'classnames';

import { ButtonWithText } from '../UI';
import { ICard } from '../../interfaces/ICard';

import { ReactComponent as PictureSvg } from '../../images/icons/upload-image.svg';
import { ReactComponent as BinSvg } from '../../images/icons/bin.svg';
import { stickerWhiteBorder } from '../../utils/constants';
import { converter } from '../../utils/converter';

import styles from './ImagePick.module.scss';

interface IProps {
  image?: string | ArrayBuffer | null;
  card?: ICard;
  className?: string;
  onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: () => void;
}

const ImagePick: React.FC<IProps> = ({
  image,
  card,
  className,
  onLoadImage,
  deleteImage,
}: IProps) => {
  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  return (
    <div className={cn(styles.avatar, className)}>
      {card ? (
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
            src={`${image}`}
          />
        </div>
      ) : (
        <img className={styles.image} alt='Загруженное изображение' src={`${image}`} />
      )}

      <div className={styles.overlay}>
        <ButtonWithText type='button' theme='no-border' className={styles.button}>
          <PictureSvg />
          <label htmlFor='myimage' className={styles.label}>
            Загрузить изображение
          </label>
        </ButtonWithText>
        <input
          type='file'
          name='file'
          id='myimage'
          accept='image/*'
          className={styles.input}
          onChange={onLoadImage}
        ></input>
        <ButtonWithText
          onClick={deleteImage}
          type='button'
          theme='no-border'
          className={styles.button}
        >
          <BinSvg />
          Удалить изображение
        </ButtonWithText>
      </div>
    </div>
  );
};

export { ImagePick };
