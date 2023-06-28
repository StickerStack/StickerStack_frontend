import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonWithText, Container } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { IUserState } from '../../../interfaces';
import { setFormIsOpen } from '../../../store/popupSlice';
import { OurWorks } from '../../OurWorks/OurWorks';

import cocktail from '../../../images/main-page/cocktail.png';
import ufo from '../../../images/main-page/ufo.png';
import no_but from '../../../images/main-page/no-but-yes.png';
import astronaut from '../../../images/main-page/astronaut.png';
import styles from './MainPage.module.scss';
import { MainHero } from '../../MainHero/MainHero';

const MainPage: React.FC = () => {
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
    <main className={styles.mainPage}>
      <MainHero />
      <OurWorks />
    </main>
  );
};

export { MainPage };
