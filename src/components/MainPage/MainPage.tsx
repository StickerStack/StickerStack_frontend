import { useNavigate } from 'react-router-dom';

import { ButtonSubmit } from '../UI';

import MainPageImage from '../../images/main-page-image.png';
import styles from './MainPage.module.scss';

interface IProps {
  isLogged: boolean;
  openPopup: () => void;
}

const MainPage: React.FC<IProps> = ({ isLogged, openPopup }: IProps) => {
  const navigate = useNavigate();

  const onClickTry = (): void => {
    if(isLogged) {
      navigate('tut-budet-ssilka-na-sozdanie-stickerov');
    } else {
      openPopup();
    }
  };

  return(
    <main className={styles.mainPage}>
      <div>
        <h1 className={styles.title}>StickerStack</h1>
        <h2 className={styles.description}>Кастомные стикеры на заказ</h2>
        <ButtonSubmit onClick={() => onClickTry()}>Попробовать</ButtonSubmit>
      </div>
      <img className={styles.img} src={MainPageImage} />
    </main>
  );
};

export { MainPage };