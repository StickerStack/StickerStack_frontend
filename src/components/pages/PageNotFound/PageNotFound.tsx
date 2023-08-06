import { useNavigate } from 'react-router-dom';
import { ButtonWithText, TitlePopup, TextForm } from '../../UI';

import { ReactComponent as UfoSvg } from '../../../images/ufo.svg';
import styles from './PageNotFound.module.scss';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <UfoSvg className={styles.ufo} />
        <TitlePopup>Упс! Ошибка 404</TitlePopup>
        <TextForm>
          Кажется, что-то пошло не так.
          <br />
          Страница не найдена.
        </TextForm>
        <ButtonWithText type='button' onClick={() => navigate('/')} className={styles.button}>
          На главную
        </ButtonWithText>
      </div>
    </div>
  );
};

export { PageNotFound };
