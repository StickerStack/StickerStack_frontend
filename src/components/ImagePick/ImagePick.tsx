import cn from 'classnames';

import styles from './ImagePick.module.scss';
import { PicOverlay } from '../PicOverlay/PicOverlay';

interface IProps {
  image?: string | ArrayBuffer | null;
  className?: string;
  onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: () => void;
}

const ImagePick: React.FC<IProps> = ({ image, className, onLoadImage, deleteImage }: IProps) => {
  return (
    <div className={cn(styles.pic, className)}>
      <img className={styles.image} alt='Загруженное изображение' src={`${image}`} />

      <PicOverlay className={styles.overlay} onLoadImage={onLoadImage} deleteImage={deleteImage} />
    </div>
  );
};

export { ImagePick };
