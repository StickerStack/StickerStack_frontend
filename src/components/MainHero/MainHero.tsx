import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonWithText, Container } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import { setFormIsOpen } from '../../store/popupSlice';

import cocktail from '../../images/main-page/cocktail.png';
import ufo from '../../images/main-page/ufo.png';
import no_but from '../../images/main-page/no-but-yes.png';
import astronaut from '../../images/main-page/astronaut.png';
import styles from './MainHero.module.scss';

const MainHero: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);

  const onClickTry = (): void => {
    if (isLogged) {
      navigate('/add-stickers');
    } else {
      dispatch(setFormIsOpen(true));
    }
  };
  return (
    <Container className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>StickerStack</h1>
        <h2 className={styles.description}>
          Быстро и просто: загрузи свои картинки и получи готовые стикеры с доставкой!
        </h2>
        <ButtonWithText type='button' color='contrast' onClick={() => onClickTry()}>
          {isLogged ? 'Заказать' : 'Попробовать'}
        </ButtonWithText>
      </section>
      <AnimatePresence>
        <motion.div className={styles.images}>
          <motion.img
            src={cocktail}
            className={styles.image}
            style={{ top: 0, left: 160 }}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.15 },
                translateY: { duration: 0.7 },
              },
              opacity: 1,
              translateY: 0,
            }}
          />
          <motion.img
            src={ufo}
            className={styles.image}
            style={{ top: 35, left: 310 }}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.3 },
                translateY: { duration: 0.7, delay: 0.15 },
              },
              opacity: 1,
              translateY: 0,
            }}
          />
          <motion.img
            src={no_but}
            className={styles.image}
            style={{ top: 90, left: 130 }}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.45 },
                translateY: { duration: 0.7, delay: 0.3 },
              },
              opacity: 1,
              translateY: 0,
            }}
          />
          <motion.img
            src={astronaut}
            className={styles.image}
            style={{ top: 65, left: 0 }}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.6 },
                translateY: { duration: 0.7, delay: 0.45 },
              },
              opacity: 1,
              translateY: 0,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export { MainHero };
