import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { setIsOpen } from '../../store/popupSlice';
import { PAGE_404 } from '../../utils/constants';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { ButtonCustom, ButtonWithText } from '../UI';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuShow, setIsMenuShow] = useState(false);

  useEffect(() => {
    setIsMenuShow(false);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (evn: KeyboardEvent) => {
      if (evn.code === 'Escape') {
        setIsMenuShow(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line
  }, []);

  const ref = useOutsideClick(
    useCallback(() => {
      setTimeout(() => setIsMenuShow(false), 100);
    }, []),
  );

  return location.pathname !== PAGE_404 ? (
    <header className={styles.header}>
      <Link to='/' className={styles.logo} />
      <AnimatePresence>
        {isMenuShow && (
          <motion.div
            className={styles.motion}
            initial={{
              opacity: 0,
            }}
            animate={{
              transition: {
                duration: 0.4,
              },
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <ProfileMenu ref={ref} />
          </motion.div>
        )}
      </AnimatePresence>
      {isLogged ? (
        <ButtonCustom
          className={styles.profile}
          type='person'
          label='Профиль'
          onClick={() => setIsMenuShow(!isMenuShow)}
        />
      ) : (
        <ButtonWithText type='button' theme='transparent' onClick={() => dispatch(setIsOpen(true))}>
          Войти
        </ButtonWithText>
      )}
    </header>
  ) : null;
};

export { Header };
