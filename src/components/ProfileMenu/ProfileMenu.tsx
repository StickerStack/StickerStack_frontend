import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { logOut } from '../../store/authSlice';
import { ButtonWithText, TextUnderline } from '../UI';
import { ADD_STICKERS, ORDERS, PROFILE } from '../../utils/constants';

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
      <Link to={PROFILE} className={styles.profile}>
        <div className={styles.avatar}></div>
        <span className={styles.name}>
          {lastName || firstName ? `${lastName} ${firstName}` : email}
        </span>
      </Link>

      <ButtonWithText
        className={styles.button}
        color='contrast'
        onClick={() => navigate(ADD_STICKERS)}
      >
        Заказать стикеры
      </ButtonWithText>

      <ul className={styles.list}>
        <li>
          <ButtonWithText
            theme='no-border'
            className={styles.link}
            onClick={() => navigate(ORDERS)}
          >
            Заказы
          </ButtonWithText>
        </li>
        <li>
          <ButtonWithText theme='no-border' className={styles.link} onClick={() => onLogOut()}>
            Выход
          </ButtonWithText>
        </li>
      </ul>
    </div>
  );
});

export { ProfileMenu };
