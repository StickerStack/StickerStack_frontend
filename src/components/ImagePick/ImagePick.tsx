import cn from 'classnames';

import { ButtonWithText } from '../UI';

import styles from './ImagePick.module.scss';

interface IProps {
  image: string;
  className?: string;
}

const ImagePick: React.FC<IProps> = ({ image, className }: IProps) => {
  return (
    <div className={styles.avatar}>
      <img className={cn(styles.image, className)} alt='Изображение' src={image} />
      <form className={styles.overlay}>
        <ButtonWithText type='button' theme='no-border' className={styles.button}>
          <div className={styles.button_img} />
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
        ></input>
        <ButtonWithText type='button' theme='no-border' className={styles.button}>
          <div className={styles.button_bin} />
          Удалить изображение
        </ButtonWithText>
      </form>
    </div>
  );
};

export { ImagePick };