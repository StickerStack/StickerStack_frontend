import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { ButtonCustom, ButtonWithText } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { setIsOpen } from '../../store/popupSlice';
import styles from './Header.module.scss';
import { PAGE_404, PROFILE } from '../../utils/constants';

const Header: React.FC = () => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const location = useLocation();
  const dispatch = useAppDispatch();

  return location.pathname !== PAGE_404 ? (
    <header className={styles.header}>
      <Link to='/' className={styles.logo} />
      {isLogged ? (
        <Link to={PROFILE}>
          <ButtonCustom className={styles.profile} type='person' />
        </Link>
      ) : (
        <ButtonWithText type='button' theme='transparent' onClick={() => dispatch(setIsOpen(true))}>
          Войти
        </ButtonWithText>
      )}
    </header>
  ) : null;
};

export { Header };
