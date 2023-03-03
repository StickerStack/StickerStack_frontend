import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './ResetPassword.module.scss';
import { switchForm } from '../../store/formSlice';
import { TextForm } from '../UI/TextForm';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <form className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm label='E-mail Вашего аккаунта' name='email' placeholder='vashapochta@gmail.com' />
      <TextForm>Мы направим ссылку на Вашу почту для восстановления пароля</TextForm>
      <ButtonSubmit>Восстановить пароль</ButtonSubmit>
      <button className={styles.button} onClick={() => dispatch(switchForm(Signin))}>
        <span className={styles.button_text}>Вернуться назад</span>
      </button>
    </form>
  );
};

export { ResetPassword };
