import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './ResetPassword.module.scss';
import { switchForm } from '../../store/formSlice';
import { Button } from '../UI/Button';
import { TextForm } from '../UI/TextForm';

const ResetPassword: React.FC = () => {
  const dispath = useDispatch();
        // FIXME: Кнопка НАЗАД является кастомной! Убрать когда дизайнер сделает ее!
  return(
    <form className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm label='E-mail Вашего аккаунта' name='email' placeholder='Почта' />
      <TextForm>Мы направим ссылку на Вашу почту для восстановления пароля</TextForm>
      <ButtonSubmit>Восстановить пароль</ButtonSubmit>
      <Button onClick={() => dispath(switchForm(Signin))}>Назад</Button>
    </form>
  );
};

export { ResetPassword };