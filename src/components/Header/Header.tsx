import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppDispatch, useOutsideClick } from '@shared/hooks';
import { IUserState, IStickersState } from '@shared/interfaces';
import { openPopup } from '@shared/store';
import { CART, COOKIE, PAGE_404, PRIVACY, TERMS } from '@utils/constants';
import { Signin } from '@components/Popups';
import { ButtonCustom, ButtonWithText, Container } from '@components/UI';
import { ProfileMenu, ScrollBar } from '@components/index';

import logo from '@images/logo.svg';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const { stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);
  const orders = useSelector((state: { user: IUserState }) => state.user.ordersAlert);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(() => {
    setY(window.scrollY);
    // eslint-disable-next-line
  }, [y]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation, location]);

  useEffect(() => {
    setIsMenuShow(false);
    // eslint-disable-next-line
  }, [location, window.scrollY]);

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

  return location.pathname !== PAGE_404 &&
    location.pathname !== PRIVACY &&
    location.pathname !== TERMS &&
    location.pathname !== COOKIE ? (
    <header className={cn(styles.header, (location.pathname !== '/' || window.scrollY) && styles.header_border)}>
      <ScrollBar />
      <Container className={styles.header_container}>
        <Link to='/' className={styles.logo}>
          <img className={styles.logo_image} src={logo} alt='Логотип StickerStack' />
          <span className={styles.logo_text}>StickerStack</span>
        </Link>
        <AnimatePresence>
          {isMenuShow && (
            <motion.div
              className={styles.motion}
              initial={{
                opacity: 0,
              }}
              animate={{
                transition: {
                  duration: 0.3,
                },
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <ProfileMenu ref={ref} />
            </motion.div>
          )}
        </AnimatePresence>
        {isLogged ? (
          <div className={styles.buttons}>
            <div className={styles.cart} onClick={() => navigate(CART)}>
              {stickers.length > 1 && <div className={styles.badge}>{stickers.length - 1}</div>}
              <ButtonCustom type='cart' label='Перейти в корзину' onClick={() => navigate(CART)} />
            </div>
            <div className={styles.profile}>
              {orders > 0 && <div className={styles.badge}>{orders}</div>}
              <ButtonCustom
                className={styles.profile}
                type='person'
                label={!isMenuShow ? 'Показать меню' : 'Скрыть меню'}
                onClick={() => setIsMenuShow(!isMenuShow)}
              />
            </div>
          </div>
        ) : (
          <ButtonWithText
            type='button'
            theme='transparent'
            className={styles.button}
            onClick={() => dispatch(openPopup(Signin))}
          >
            Войти
          </ButtonWithText>
        )}
      </Container>
    </header>
  ) : null;
};

export { Header };
