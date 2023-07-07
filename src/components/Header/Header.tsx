import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/hooks';
import { ICardsState, IUserState } from '../../interfaces';
import { openPopup } from '../../store/popupSlice';
import { CART, PAGE_404 } from '../../utils/constants';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { ButtonCustom, ButtonWithText, Container } from '../UI';

import logo from '../../images/logo.svg';
import styles from './Header.module.scss';
import { Signin } from '../Popups/Signin/Signin';

const Header: React.FC = () => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuShow, setIsMenuShow] = useState(false);
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

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
      <Container className={styles.header_container}>
        <Link to='/' className={styles.logo}>
          <img className={styles.logo_image} src={logo} alt='Логотип StickerStack' />
          StickerStack
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
                  duration: 0.4,
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
              {cards.length > 0 && <div className={styles.badge}>{cards.length}</div>}
              <ButtonCustom type='cart' label='Перейти в корзину' onClick={() => navigate(CART)} />
            </div>

            <ButtonCustom
              className={styles.profile}
              type='person'
              label={!isMenuShow ? 'Показать меню' : 'Скрыть меню'}
              onClick={() => setIsMenuShow(!isMenuShow)}
            />
          </div>
        ) : (
          <ButtonWithText
            type='button'
            theme='transparent'
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
