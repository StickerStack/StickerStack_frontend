import cn from 'classnames';
import { useState } from "react";
import { useSelector } from 'react-redux';

import { ButtonWithText, TitlePage } from '../UI';
import { ImagePick } from '../ImagePick/ImagePick';
import ProfileInput from '../UI/ProfileInput/ProfileInput';

import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { logOut } from '../../store/authSlice';

import EmptyAvatarImage from '../../images/empty-avatar.svg';
import styles from './ProfilePage.module.scss';
import { updateStatus } from '../../store/userSlice';

const ProfilePage: React.FC = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email);

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [profileEmail, setProfileEmail] = useState<string>(email);

  const dispatch = useAppDispatch();


  // #TODO: Когда будет готово выпадающее меню перенести туда onLogOut!
  const onLogOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return;
    }

    dispatch(logOut()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(updateStatus(false));
      }
    });
  };

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.container}>
        <ImagePick image={EmptyAvatarImage} />
        <div className={styles.profile_data}>
          <div className={styles.inputs}>
            <ProfileInput
              name='Имя'
              type='text'
              placeholder='Имя'
              onChange={setName}
              value={name}
            />

            <ProfileInput
              name='Фамилия'
              type='text'
              placeholder='Фамилия'
              onChange={setSurname}
              value={surname}
            />
            <ProfileInput
              name='Email'
              type='email'
              placeholder='E-mail'
              onChange={setProfileEmail}
              value={profileEmail}
            />
          </div>
          <ButtonWithText className={styles.button} type='button' theme='filled'>
            Сохранить
          </ButtonWithText>
        </div>
      </div>
    </main>
  );
};

export { ProfilePage };
