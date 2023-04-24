import {useSelector} from 'react-redux';

import {ButtonWithText, TitlePage} from '../UI';
import {IUserState} from '../../interfaces';
import EmptyAvatarImage from '../../images/empty-avatar.png';

import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email);

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img
            className={`${styles.image} ${styles.empty}`}
            alt='Аватар'
            src={EmptyAvatarImage}
          />
        </div>
        <div className={styles.profile_data}>
          <div className={styles.inputs}>
            <div className={styles.input_container}>
              <input type='text' className={styles.input} placeholder='Имя'/>
              <button
                className={styles.clear_icon}
                type='button'
              />
            </div>
            <div className={styles.input_container}>
              <input type='text' className={styles.input} placeholder='Имя'/>
              <button
                className={styles.clear_icon}
                type='button'
              />
            </div>
            <div className={styles.input_container}>
              <input type='email' value={email} className={styles.input} placeholder='E-mail'/>
              <button
                className={styles.clear_icon}
                type='button'
              />
            </div>
          </div>

          <ButtonWithText
            className={styles.button}
            type='button'
            theme='filled'
          >
            Сохранить
          </ButtonWithText>
        </div>
      </div>
    </main>
  );
};

export { ProfilePage };
