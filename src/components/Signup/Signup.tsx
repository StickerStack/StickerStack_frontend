import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './Signup.module.scss';
import { switchForm } from '../../store/formSlice';

const Signup: React.FC = () => {
  const dispatсh = useDispatch();

  return(
    <form className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm placeholder='vashapochta@gmail.com' name='email' label='Email' type='email' />
        <InputForm
          placeholder='впишите пароль'
          name='password'
          label='Пароль'
          type='password'
        />
        <InputForm
          placeholder='еще раз пароль'
          name='password'
          label='Подтвердите пароль'
          type='password'
        />
      </div>
      <ButtonSubmit>Зарегистрироваться</ButtonSubmit>
      <span className={styles.link}>Уже есть аккаунт? <button type='button' onClick={() => dispatсh(switchForm(Signin))} className={styles.button}>Войти</button></span>
    </form>
  );
};

export { Signup };