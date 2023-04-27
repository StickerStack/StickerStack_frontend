import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ButtonWithText } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import MainPageImage from '../../images/main-page-image.png';
import { IUserState } from '../../interfaces';
import { setIsOpen } from '../../store/popupSlice';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);

  const onClickTry = (): void => {
    if (isLogged) {
      navigate('/add-stickers');
    } else {
      dispatch(setIsOpen(true));
    }
  };

  return (
    <main className={styles.mainPage}>
      <div>
        <h1 className={styles.title}>StickerStack</h1>
        <h2 className={styles.description}>Кастомные стикеры на заказ</h2>
        <ButtonWithText type='button' onClick={() => onClickTry()}>
          Попробовать
        </ButtonWithText>
      </div>
      <img className={styles.img} src={MainPageImage} />
    </main>
  );
};

export { MainPage };
