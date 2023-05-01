import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ButtonWithText } from '../UI';
import { IPopupState } from '../../interfaces';
import { setCropIsOpen, setNewCrop } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './ImagePick.module.scss';

interface IProps {
  image: string;
  className?: string;
}

const ImagePick: React.FC<IProps> = ({ image, className }: IProps) => {
  const newAvatar = useSelector((state: { popup: IPopupState }) => state.popup.newCrop);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () =>
        dispatch(setCropIsOpen({ imageIsOpen: true, imageSrc: reader.result?.toString() || '' })),
      );
    }
  };

  return (
    <div className={styles.avatar}>
      <img className={cn(styles.image, className)} alt='Изображение' src={newAvatar || image} />
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
          accept='image/jpg, image/jpeg, image/png'
          className={styles.input}
          onInput={handleFileChange}
        ></input>
        <ButtonWithText
          type='button'
          theme='no-border'
          className={styles.button}
          onClick={() => {
            dispatch(setNewCrop(''));
          }}
        >
          <div className={styles.button_bin} />
          Удалить изображение
        </ButtonWithText>
      </form>
    </div>
  );
};

export { ImagePick };
