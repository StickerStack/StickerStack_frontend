import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonWithText, CheckBoxForm, TitleForm, TextUnderline, EyeButton, Input } from '../UI';
import { Signin } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen, switchForm, setIsOpen } from '../../store/popupSlice';
import { getUser, updateStatus } from '../../store/userSlice';
import { signUp, signIn, sendVerificationCode } from '../../store/authSlice';
import { registerEmail, registerPassword, registerRepeatPassword } from '../../utils/registersRHF';
import styles from './Signup.module.scss';
import { ADD_STICKERS } from '../../utils/constants';
import { InputWithButton } from '../UI/InputWithButton/InputWithButton';
import { InputError } from '../UI/InputError/InputError';
import { InputField } from '../UI/InputField/InputField';
import { Label } from '../UI/Label';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const [statePassword, setStatePasswod] = useState(false);
  const [stateRepeatPassword, setStateRepeatPassword] = useState(false);

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    dispatch(signUp({ email: userEmail, password: userPassword })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(sendVerificationCode());
        dispatch(signIn({ email: userEmail, password: userPassword })).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(getUser());
            dispatch(updateStatus(true));
            dispatch(setIsOpen(false));
            navigate(ADD_STICKERS);
            dispatch(
              setMessageIsOpen({
                messageIsOpen: true,
                message: 'Подтвердите почту',
                messageIsError: false,
              })
            );
          }
        });
      }
      if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Учётная запись с такой почтой уже существует',
            messageIsError: true,
          })
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputField className='email'>
          <Label htmlFor='email'>Электронная почта</Label>
          <Input
            autoComplete='email'
            register={register}
            option={registerEmail}
            name='email'
            error={errors.email}
          />
          <InputError error={errors.email} />
        </InputField>
        <InputField className='password'>
          <Label htmlFor='password'>Пароль</Label>
          <InputWithButton
            register={register}
            option={registerPassword}
            name='password'
            type={statePassword ? 'text' : 'password'}
            autoComplete='current-password'
            error={errors.password}
            button={
              <EyeButton
                onClick={() => setStatePasswod(!statePassword)}
                shown={statePassword}
                visible={dirtyFields?.password && true}
              />
            }
          />
          <InputError error={errors.password} />
        </InputField>
        <InputField className='password'>
          <Label htmlFor='repeat-password'>Подтвердить пароль</Label>
          <InputWithButton
            register={register}
            option={{
              ...registerRepeatPassword,
              validate: (val: string) => {
                if (val !== watch('password')) {
                  return 'Пароли не совпадают';
                }
              },
            }}
            name='repeat-password'
            type={stateRepeatPassword ? 'text' : 'password'}
            autoComplete='repeat-password'
            error={errors['repeat-password']}
            button={
              <EyeButton
                onClick={() => setStateRepeatPassword(!stateRepeatPassword)}
                shown={stateRepeatPassword}
                visible={dirtyFields['repeat-password'] && true}
              />
            }
          />
          <InputError error={errors['repeat-password']} />
        </InputField>
      </div>
      <CheckBoxForm
        name='confirmCheckbox'
        register={register}
        option={{ required: 'Обязательное поле' }}
        error={errors?.confirmCheckbox}
      >
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
      <ButtonWithText type='submit'>Зарегистрироваться</ButtonWithText>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <TextUnderline type='button' onClick={() => dispatch(switchForm(Signin))}>
          Войти
        </TextUnderline>
      </span>
    </form>
  );
};

export { Signup };
