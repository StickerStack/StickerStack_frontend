import { ButtonWithText, TitleForm, TextForm } from '../UI';

import styles from './VerifyEmail.module.scss';
import { useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.verify}>
      <TitleForm>Почта успешно подтверждена</TitleForm>
      <TextForm>Теперь вам доступен полный функционал для создания стикеров!</TextForm>
      <ButtonWithText type='button' onClick={() => navigate('/add-stickers')}>
        Начать!
      </ButtonWithText>
    </div>
  );
};

export { VerifyEmail };
