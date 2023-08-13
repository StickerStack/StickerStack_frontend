import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import { ButtonWithText } from '../UI';
import { PROFILE } from '../../utils/constants';

import { ReactComponent as PictureSvg } from '../../images/icons/upload-image.svg';
import { ReactComponent as BinSvg } from '../../images/icons/bin.svg';

import styles from './PicOverlay.module.scss';

interface IProps {
  label?: string;
  className?: string;
  onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: () => void;
}

const PicOverlay: React.FC<IProps> = ({ className, label, onLoadImage, deleteImage }: IProps) => {
  const location = useLocation();

  return (
    <div className={cn(styles.overlay, className)}>
      <ButtonWithText type='button' theme='no-border' className={styles.button}>
        <label htmlFor={location.pathname === PROFILE ? 'myimage' : label} className={styles.flex}>
          <PictureSvg /> <span className={styles.label}>Загрузить изображение</span>
        </label>
      </ButtonWithText>
      {location.pathname === PROFILE && (
        <input
          className={styles.input}
          type='file'
          name='file'
          id='myimage'
          accept='.jpg, .jpeg, .png'
          onChange={onLoadImage}
        />
      )}
      {location.pathname === PROFILE && (
        <ButtonWithText
          onClick={deleteImage}
          type='button'
          theme='no-border'
          className={cn(styles.button, styles.flex)}
        >
          <BinSvg />
          Удалить изображение
        </ButtonWithText>
      )}
    </div>
  );
};

export { PicOverlay };
