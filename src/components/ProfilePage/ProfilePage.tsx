import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ButtonWithText, TitleForm, TitlePage } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces/IUserState';
import { logOut } from '../../store/userSlice';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email);
  const [imageUpload, setImageUpload] = useState<File | ''>('');
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpload(e.target.files[0]);
    }
  };

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.avatar}>
        <img
          className={styles.image}
          alt='Аватар'
          src={imageUpload && URL.createObjectURL(imageUpload)}
        />
        <form className={styles.overlay} onSubmit={handleSubmit}>
          <ButtonWithText type='button' theme='no-border'>
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
          <div className={cn(styles.buttons, imageUpload && styles.buttons_visible)}>
            <ButtonWithText type='submit' theme='no-border'>
              Сохранить
            </ButtonWithText>
            <ButtonWithText type='button' theme='no-border' onClick={() => setImageUpload('')}>
              Удалить
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
