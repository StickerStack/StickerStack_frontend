import { useNavigate } from 'react-router-dom';
import { ButtonWithText } from '../../UI';

import styles from './PageNotFound.module.scss';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.images}>
          <div className={styles.four} />
          <div className={styles.image} />
          <div className={styles.four} />
        </div>
        <span className={styles.text}>
          Упс… Страница не найдена.
          <br />
          Давайте начнем сначала!
        </span>

        <ButtonWithText type='button' onClick={() => navigate('/')} className={styles.button}>
          На главную
        </ButtonWithText>
      </div>
    </div>
  );
};

export { PageNotFound };
