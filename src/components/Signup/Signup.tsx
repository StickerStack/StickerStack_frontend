import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { CheckBoxForm } from '../UI/CheckBoxForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './Signup.module.scss';
import { switchForm } from '../../store/formSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          placeholder='vashapochta@gmail.com'
          name='email'
          label='Email'
          type='email'
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
          optionalEyeButton={{
            visible: watch('password') !== (undefined || ''),
          }}
        />
        <InputForm
          placeholder='еще раз пароль'
          name='passwordCheck'
          label='Подтвердите пароль'
          type='password'
          register={{
            ...register('passwordCheck', {
              ...registerPassword,
              validate: (val: string) => {
                if (val !== watch('password')) {
                  return 'Пароли не совпадают';
                }
              },
              required: 'Введи пароль повторно',
            }),
          }}
          error={errors?.passwordCheck?.message ? `${errors?.passwordCheck?.message}` : ''}
          optionalEyeButton={{
            visible: watch('passwordCheck') !== (undefined || ''),
          }}
        />
      </div>
      <CheckBoxForm>
        <p className={styles.checktext}>
          Я согласен с{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Условиями использования сервиса
          </a>
        </p>
      </CheckBoxForm>
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
