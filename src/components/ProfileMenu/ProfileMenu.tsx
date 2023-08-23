import cn from 'classnames';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';

import { IUserState } from '../../interfaces';
import { logOut } from '../../store/authSlice';
import { ButtonWithText } from '../UI';
import { ADD_STICKERS, ORDERS, PROFILE } from '../../utils/constants';

import EmptyAvatarImage from '../../images/empty-avatar.png';
import styles from './ProfileMenu.module.scss';

// eslint-disable-next-line react/prop-types
const ProfileMenu = forwardRef<HTMLHeadingElement>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, firstName, lastName, avatar } = useSelector(
    (state: { user: IUserState }) => state.user,
  );

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
        <div className={styles.avatar}>
          <img
            className={styles.image}
            alt='Аватар пользователя'
            crossOrigin='use-credentials'
            src={avatar}
            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = event.target as HTMLImageElement;
              target.src = EmptyAvatarImage ?? '';
            }}
          />
        </div>
        <div className={styles.namebox}>
          <span className={cn(styles.name, !lastName && !firstName && styles.name_overflow)}>
            {lastName || firstName ? `${firstName}` : email}
          </span>
          {(lastName || firstName) && <span className={styles.name}>{lastName}</span>}
        </div>
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
