import { ResetPassword } from '../..';
import { TextUnderline, TextForm, TitlePopup } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { switchForm } from '../../../store/popupSlice';

import styles from './ResetPasswordInfo.module.scss';

const ResetPasswordInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.resetpassword}>
      <TitlePopup>Восстановление пароля</TitlePopup>
      <TextForm>Перейдите на почту ivanov@mail.ru чтобы восстановить пароль</TextForm>
      <TextUnderline type='button' onClick={() => dispatch(switchForm(ResetPassword))}>
        Ввести другую почту
      </TextUnderline>
    </div>
  );
};

export { ResetPasswordInfo };
