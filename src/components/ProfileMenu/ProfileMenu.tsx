import cn from 'classnames';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@shared/hooks';

import { IUserState } from '@shared/interfaces';
import { logOut } from '@shared/store';
import { ButtonWithText } from '../UI';
import { ADD_STICKERS, ORDERS, PROFILE } from '@utils/constants';
import { profileMenu } from '../../assets/static/profile';

import EmptyAvatarImage from '@images/empty-avatar.png';
import styles from './ProfileMenu.module.scss';

// eslint-disable-next-line react/prop-types
const ProfileMenu = forwardRef<HTMLHeadingElement>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, firstName, lastName, avatar, ordersAlert } = useSelector((state: { user: IUserState }) => state.user);

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
          <span className={cn(styles.name, styles.name_overflow)}>
            {lastName || firstName ? `${firstName}` : email}
          </span>
          {(lastName || firstName) && <span className={cn(styles.name, styles.name_overflow)}>{lastName}</span>}
        </div>
      </Link>

      <ButtonWithText className={styles.button} color='contrast' onClick={() => navigate(ADD_STICKERS)}>
        {profileMenu.button}
      </ButtonWithText>

      <ul className={styles.list}>
        <li>
          <ButtonWithText theme='no-border' className={styles.link} onClick={() => navigate(ORDERS)}>
            {profileMenu.orders}
            {ordersAlert > 0 && <div className={styles.badge}>{ordersAlert}</div>}
          </ButtonWithText>
        </li>
        <li>
          <ButtonWithText theme='no-border' className={styles.link} onClick={() => onLogOut()}>
            {profileMenu.signout}
          </ButtonWithText>
        </li>
      </ul>
    </div>
  );
});

export { ProfileMenu };
