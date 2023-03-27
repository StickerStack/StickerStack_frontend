import { useAppDispatch } from '../../hooks/hooks';
import { ButtonSubmit, TitleForm, TextForm } from '../UI';
import { setIsOpen } from '../../store/popupSlice';

import styles from './VerifyEmail.module.scss';

const VerifyEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.verify}>
      <TitleForm>Спасибо за регистрацию!</TitleForm>
      <TextForm>
        Ваша почта успешно подтверждена.
        <br />
        Купи нам кофе по ссылочке :D
      </TextForm>
      <ButtonSubmit onClick={() => dispatch(setIsOpen(true))}>Купить!</ButtonSubmit>
    </div>
  );
};

export { VerifyEmail };
