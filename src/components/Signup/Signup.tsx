import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './Signup.module.scss';
import { switchForm } from '../../store/formSlice';

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm placeholder='vashapochta@gmail.com' name='email' label='Email' type='email' />
        <InputForm
          placeholder='впишите пароль'
          name='password'
          label='Пароль'
          type={passwordShown ? 'text' : 'password'}
          optionalEyeButton={{
            shown: passwordShown,
            onClick: () => togglePassword(),
          }}
        />
        <InputForm
          placeholder='еще раз пароль'
          name='password'
          label='Подтвердите пароль'
          type={passwordShown ? 'text' : 'password'}
          optionalEyeButton={{
            shown: passwordShown,
            onClick: () => togglePassword(),
          }}
        />
      </div>
      <ButtonSubmit>Зарегистрироваться</ButtonSubmit>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <button
          type='button'
          onClick={() => dispatch(switchForm(Signin))}
          className={styles.button}
        >
          <span className={styles.text}>Войти</span>
        </button>
      </span>
    </form>
  );
};

export { Signup };
