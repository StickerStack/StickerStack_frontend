import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ButtonWithText, Container, TitlePage } from '../../UI';

import { useAppDispatch } from '../../../hooks/hooks';
import MainPageImage from '../../../images/main-page-image.png';
import { IUserState } from '../../../interfaces';
import { setFormIsOpen } from '../../../store/popupSlice';
import styles from './MainPage.module.scss';
import { FAQ } from '../../FAQ/FAQ';

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
      <Container className={styles.container}>
        <section>
          <h1 className={styles.title}>StickerStack</h1>
          <h2 className={styles.description}>
            Быстро и просто: загрузи свои картинки и получи готовые стикеры с доставкой!
          </h2>
          <ButtonWithText type='button' color='contrast' onClick={() => onClickTry()}>
            Попробовать
          </ButtonWithText>
        </section>
        <img className={styles.img} src={MainPageImage} />
      </Container>
      <Container className={styles.container}>
        <section>
          <TitlePage type='section-title' className={styles.title_section}>
            Часто задаваемые вопросы
          </TitlePage>
          <FAQ />
        </section>
      </Container>
    </main>
  );
};

export { MainPage };
