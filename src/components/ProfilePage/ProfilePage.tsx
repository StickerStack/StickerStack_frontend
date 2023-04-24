import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ButtonWithText, TitleForm, TitlePage } from '../UI';

import { setCropIsOpen, setNewCrop } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { IPopupState } from '../../interfaces';
import { IUserState } from '../../interfaces/IUserState';
import { logOut } from '../../store/userSlice';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email);
  const newAvatar = useSelector((state: { popup: IPopupState }) => state.popup.newCrop);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        dispatch(setCropIsOpen({ imageIsOpen: true, imageSrc: reader.result?.toString() || '' })),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.avatar}>
        <img className={styles.image} alt='Аватар' src={newAvatar || ''} />
        <form className={styles.overlay} onSubmit={handleSubmit}>
          <ButtonWithText type='button' theme='no-border' className={styles.button}>
            <div className={styles.button_pen} />
            <label htmlFor='myimage' className={styles.label}>
              Сменить аватар
            </label>
          </ButtonWithText>
          <input
            type='file'
            name='file'
            id='myimage'
            accept='image/*'
            className={styles.input}
            onChange={handleFileChange}
          ></input>
          <div className={cn(styles.buttons, newAvatar && styles.buttons_visible)}>
            <ButtonWithText
              type='button'
              theme='no-border'
              onClick={() => {
                dispatch(setNewCrop(''));
              }}
              className={styles.button}
            >
              <div className={styles.button_bin} />
              Удалить аватар
            </ButtonWithText>
          </div>
        </form>
      </div>
      <TitleForm>Почта: {email}</TitleForm>
      <ButtonWithText theme='transparent' type='button' onClick={() => onLogOut()}>
        Выйти
      </ButtonWithText>
    </main>
  );
};

export { ProfilePage };
