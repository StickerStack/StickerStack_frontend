import cn from 'classnames';

import { ButtonWithText } from '../UI';
import { TCardShape } from '../../interfaces/ICard';

import { ReactComponent as PictureSvg } from '../../images/icons/upload-image.svg';
import { ReactComponent as BinSvg } from '../../images/icons/bin.svg';
import styles from './ImagePick.module.scss';

interface IProps {
  image?: string | ArrayBuffer | null;
  shape?: TCardShape;
  className?: string;
  onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: () => void;
}

const ImagePick: React.FC<IProps> = ({
  image,
  shape,
  className,
  onLoadImage,
  deleteImage,
}: IProps) => {
  return (
    <div className={cn(styles.avatar, className)}>
      <img
        className={cn(styles.image, styles[`image_${shape}`])}
        alt='Загруженное изображение'
        src={`${image}`}
      />
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
