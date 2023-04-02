import { useNavigate } from 'react-router-dom';
import { ButtonSubmit, TitleForm, TextForm } from '../UI';

import styles from './PageNotFound.module.scss';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <TitleForm>Упс! Ошибка 404</TitleForm>
        <TextForm>
          Кажется, что-то пошло не так.
          <br />
          Страница не найдена.
        </TextForm>
        <ButtonSubmit onClick={() => navigate('/')}>Вернуться на главную</ButtonSubmit>
      </div>
    </div>
  );
};

export { PageNotFound };
