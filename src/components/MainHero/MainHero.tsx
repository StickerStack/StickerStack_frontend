import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonWithText, Container } from '@components/UI';
import { useAppDispatch } from '@shared/hooks';
import { IUserState } from '@shared/interfaces';
import { openPopup } from '@shared/store';
import { Signin } from '@components/Popups';
import { hero } from '@static/mainpage';

// import cocktail from '../../images/main-page/cocktail.png';
// import ufo from '../../images/main-page/ufo.png';
// import no_but from '../../images/main-page/no-but-yes.png';
// import astronaut from '../../images/main-page/astronaut.png';
import space from '@images/main-page/space-sticker-square.png';
import spok from '@images/main-page/spok-square.png';
import starwars from '@images/main-page/starwars.png';
import cat from '@images/main-page/space-cat.png';
import sticker_ufo from '@images/main-page/sticker-ufo-square.png';
import StarSvg from '@images/main-page/star-decor.svg?react'
import styles from './MainHero.module.scss';

const MainHero: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);

  const onClickTry = (): void => {
    if (isLogged) {
      navigate('/add-stickers');
    } else {
      dispatch(openPopup(Signin));
    }
  };
  return (
    <Container className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>{hero.title}</h1>
        <h2 className={styles.description}>{hero.text}</h2>
        <ButtonWithText type='button' color='contrast' className={styles.button} onClick={() => onClickTry()}>
          {isLogged ? hero.buttonLogged : hero.buttonGuest}
        </ButtonWithText>
      </section>
      <AnimatePresence>
        <motion.div className={styles.images}>
          
          <motion.img
            src={space}
            className={styles.image}
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
          /><motion.img
            src={spok}
            className={styles.image}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.3 },
                translateY: { duration: 0.7 , delay: 0.15 },
              },
              opacity: 1,
              translateY: 0,
            }}
          /><motion.img
            src={starwars}
            className={styles.image}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.45 },
                translateY: { duration: 0.7, delay: 0.3},
              },
              opacity: 1,
              translateY: 0,
            }}
          />
          <motion.img
            src={cat}
            className={styles.image}
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
          <motion.img
            src={sticker_ufo}
            className={styles.image}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 0.35, delay: 0.8 },
                translateY: { duration: 0.7, delay: 0.6 },
              },
              opacity: 1,
              translateY: 0,
            }}
          />
          <motion.div
            className={styles.star}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 2 },
              },
              opacity: [0, 0.2, 1, 0.65, 1, 0.75, 1],
              translateY: 0,
            }}>
            <StarSvg />
          </motion.div>
          <motion.div
            className={styles.star}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 2 },
              },
              opacity: [0, 0.2, 1, 0.65, 1, 0.75, 1],
              translateY: 0,
            }}>
            <StarSvg />
          </motion.div>
          <motion.div
            className={styles.star}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 2 },
              },
              opacity: [0, 0.2, 1, 0.65, 1, 0.75, 1],
              translateY: 0,
            }}>
            <StarSvg />
          </motion.div>
          <motion.div
            className={styles.star}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 2 },
              },
              opacity: [0, 0.2, 1, 0.35, 1, 0.45, 1],
              translateY: 0,
            }}>
            <StarSvg />
          </motion.div>
          <motion.div
            className={styles.star}
            initial={{
              opacity: 0,
              translateY: 170,
            }}
            animate={{
              transition: {
                opacity: { duration: 2 },
              },
              opacity: [0, 0.2, 1, 0.65, 1, 0.75, 1],
              translateY: 0,
            }}>
            <StarSvg />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export { MainHero };
