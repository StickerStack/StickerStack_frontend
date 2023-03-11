import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { useForm } from 'react-hook-form';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { CheckBoxForm } from '../UI/CheckBoxForm';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signup } from '../Signup';

import styles from './Signin.module.scss';
import { switchForm } from '../../store/formSlice';
import { signIn } from '../../store/logSlice';
import { ResetPassword } from '../ResetPassword';
import { registerEmail, registerPassword } from '../../utils/registersRHF';

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberCheckbox: false,
    },
  });

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const appDispatch = useAppDispatch();

  const onSubmit = () => {
    appDispatch(signIn({ email: userEmail, password: userPassword }))
      /* .then(() =>
    - закрыть попап
    - поменять кнопку входа на иконку юзера
    - сделать доступной страницу добавления картинок
    
    ) */
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={styles.signin} onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Войти в личный кабинет</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          placeholder='vashapochta@gmail.com'
          name='email'
          label='Email'
          type='text'
          register={{ ...register('email', registerEmail) }}
          error={errors?.email?.message ? `${errors?.email?.message}` : ''}
        />
        <InputForm
          placeholder='впишите пароль'
          name='password'
          label='Пароль'
          type='password'
          register={{ ...register('password', registerPassword) }}
          error={errors?.password?.message ? `${errors?.password?.message}` : ''}
          optionalButton={{
            text: 'Забыли пароль?',
            onClick: () => {
              dispatch(switchForm(ResetPassword));
            },
          }}
          optionalEyeButton={{
            visible: watch('password') !== (undefined || ''),
          }}
        />
        <CheckBoxForm name='rememberCheckbox' register={register('rememberCheckbox')}>
          Запомнить меня
        </CheckBoxForm>
      </div>
      <ButtonSubmit>Войти</ButtonSubmit>
      <span className={styles.link}>
        Нет аккаунта?{' '}
        <button
          onClick={() => dispatch(switchForm(Signup))}
          type='button'
          className={styles.button}
        >
          <span className={styles.text}>Зарегистрироваться</span>
        </button>
      </span>
    </form>
  );
};

export { Signin };
