import { Link } from 'react-router-dom';
import { ButtonSubmit } from '../UI/ButtonSubmit';
import { CheckBoxForm } from '../UI/CheckBoxForm';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';

import styles from './Signin.module.scss';

const Signin: React.FC = () => {
  return (
    <form className={styles.signin}>
      <TitleForm>Войти в личный кабинет</TitleForm>
      <div className={styles.inputs}>
        <InputForm name='email' label='Email' type='email' />
        <InputForm
          name='password'
          label='Пароль'
          type='password'
          optionalLink={{ text: 'Забыли пароль?', to: '/signup' }}
        />
        <CheckBoxForm label='Запомнить меня' />
      </div>
      <ButtonSubmit>Войти</ButtonSubmit>
      <Link className={styles.link} to='/signup'>Нет аккаунта? Зарегистрироваться</Link>
    </form>
  );
};

export { Signin };
