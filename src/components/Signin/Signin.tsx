import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FieldValues } from 'react-hook-form';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { CheckBoxForm } from '../UI/CheckBoxForm';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signup } from '../Signup';

import styles from './Signin.module.scss';
import { switchForm } from '../../store/formSlice';
import { ResetPassword } from '../ResetPassword';
import { registerEmail, registerPassword } from '../../utils/registersRHF';

const Signin: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
