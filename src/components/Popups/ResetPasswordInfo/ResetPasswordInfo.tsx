import { ResetPassword } from '../..';
import { TextUnderline, TextForm, TitlePopup } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { switchForm } from '../../../store/popupSlice';

import styles from './ResetPasswordInfo.module.scss';

const ResetPasswordInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const email = localStorage.getItem('email');
  return (
    <div className={styles.resetpassword}>
      <TitlePopup>Восстановление пароля</TitlePopup>
      <TextForm>Перейдите на почту {email}, чтобы восстановить пароль</TextForm>
      <TextUnderline type='button' onClick={() => dispatch(switchForm(ResetPassword))}>
        Ввести другую почту
      </TextUnderline>
    </div>
  );
};

export { ResetPasswordInfo };
