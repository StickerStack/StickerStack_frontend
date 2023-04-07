import { ButtonWithText, TextForm, TitleForm } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { setIsOpen } from '../../store/popupSlice';
import styles from './SuccessfulSignup.module.scss';

const SuccessfulSignup: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <form className={styles.successful} onSubmit={onClose}>
      <TitleForm>Спасибо за регистрацию!</TitleForm>
      <TextForm>
        Мы направили ссылку на Вашу почту, указанную при регистрации. Пожалуйста, подтвердите почту.
      </TextForm>
      <ButtonWithText type='button'>Понятно!</ButtonWithText>
    </form>
  );
};

export { SuccessfulSignup };
