import cn from 'classnames';
import { useSelector } from 'react-redux';

import { ButtonWithText, TitlePage } from '../UI';
import { ImagePick } from '../ImagePick/ImagePick';
import ProfileInput from '../UI/ProfileInput/ProfileInput';

import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { logOut } from '../../store/userSlice';

import EmptyAvatarImage from '../../images/empty-avatar.svg';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return;
    }

    dispatch(logOut());
  };

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.container}>
        <ImagePick image={EmptyAvatarImage} />
        <div className={styles.profile_data}>
          <div className={styles.inputs}>
            <ProfileInput name='Имя' type='text' placeholder='Имя' />

            <ProfileInput name='Фамилия' type='text' placeholder='Фамилия' />

            <ProfileInput name='Email' type='email' placeholder='E-mail' />
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
