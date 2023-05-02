import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { setIsOpen } from '../../store/popupSlice';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { ButtonCustom, ButtonWithText } from '../UI';
import styles from './Header.module.scss';
import { PAGE_404, PROFILE } from '../../utils/constants';

const Header: React.FC = () => {
  // const isLogged = false;
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuShow, setIsMenuShow] = useState(false)

  useEffect(() => {
    setIsMenuShow(false)
  }, [location])

  useEffect(() => {
    const handleKeyDown = (evn: KeyboardEvent) => {
      if (evn.code === 'Escape') {
        setIsMenuShow(false)
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line
  }, []);

  return location.pathname !== PAGE_404 ? (
    <header className={styles.header}>
      <Link to='/' className={styles.logo} />
      {isLogged ? (
        < ButtonCustom className={styles.profile} type='person' onClick={() => setIsMenuShow(true)} />
      ) : (
        <ButtonWithText type='button' theme='transparent' onClick={() => dispatch(setIsOpen(true))}>
          Войти
        </ButtonWithText>
      )
      }
      {isMenuShow && <ProfileMenu />}
    </header >
  ) : null;
};

export { Header };
