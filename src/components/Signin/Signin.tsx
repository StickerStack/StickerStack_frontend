import { useForm } from 'react-hook-form';

import { ButtonSubmit, CheckBoxForm, InputForm, TitleForm } from '../UI';
import { Signup, ResetPassword } from '../';

import { setIsOpen, setMessageIsOpen, switchForm } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { getUser, signIn } from '../../store/userSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signin.module.scss';

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();
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

  const onSubmit = () => {
    dispatch(signIn({ email: userEmail, password: userPassword }))
      .then((res) => {
        if(res.meta.requestStatus === 'fulfilled') {
          dispatch(getUser());
          dispatch(setIsOpen(false));
        }

        if(res.meta.requestStatus === 'rejected' && res.payload === '400') {
          dispatch(setMessageIsOpen({ messageIsOpen: true, message: 'Неверная почта или пароль' }));
        }
      })
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
          label='E-mail'
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
          error={
            errors?.password?.message ? `${errors?.password?.message}` : ''
          }
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
        <CheckBoxForm
          name='rememberCheckbox'
          register={register('rememberCheckbox')}
        >
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
