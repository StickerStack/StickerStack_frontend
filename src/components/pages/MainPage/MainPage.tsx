import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ButtonWithText, Container } from '../../UI';

import { useAppDispatch } from '../../../hooks/hooks';
import MainPageImage from '../../../images/main-page-image.png';
import { IUserState } from '../../../interfaces';
import { openPopup } from '../../../store/popupSlice';
import styles from './MainPage.module.scss';
import { Signin } from '../../Popups/Signin/Signin';

const MainPage: React.FC = () => {
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
    <main className={styles.mainPage}>
      <Container className={styles.mainPage_container}>
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
    </main>
  );
};

export { MainPage };
