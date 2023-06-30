import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { logOut } from '../../store/authSlice';
import { ButtonWithText, TextUnderline } from '../UI';
import styles from './ProfileMenu.module.scss';

// eslint-disable-next-line react/prop-types
const ProfileMenu = forwardRef<HTMLHeadingElement>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, firstName, lastName } = useSelector((state: { user: IUserState }) => state.user);

  const onLogOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return;
    }

    dispatch(logOut()).then(() => {
      location.reload();
    });
  };

  return (
    <div className={styles.menu} ref={ref}>
      <Link to='/profile' className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.name}>
          {lastName || firstName ? `${lastName} ${firstName}` : email}
        </div>
      </Link>

      <ButtonWithText className={styles.button} onClick={() => navigate('/add-stickers')}>
        Заказать стикеры
      </ButtonWithText>

      <ul className={styles.list}>
        {/* <li>Заказы</li> */}
        {/* <li>Служба поддержки</li> */}
        <li>
          <TextUnderline onClick={() => onLogOut()}>Выход</TextUnderline>
        </li>
      </ul>
    </div>
  );
});

export { ProfileMenu };
