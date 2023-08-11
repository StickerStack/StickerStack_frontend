import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  ButtonWithText,
  TitlePopup,
  TextUnderline,
  Input,
  EyeButton,
  Label,
  InputField,
  InputError,
  InputWithButton,
} from '../../UI';
import { Signup, ResetPassword } from '../..';

import { closePopup, openPopup, openMessage } from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUser, signInMockUser, updateStatus } from '../../../store/userSlice';
import { signIn } from '../../../store/authSlice';
import { registerEmail, registerPassword } from '../../../utils/registersRHF';
import styles from './Signin.module.scss';
import { motion } from 'framer-motion';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, dirtyFields, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const [statePassword, setStatePasswod] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    const userEmail = getValues('email');
    const userPassword = getValues('password');

    if (userEmail === 'my@super.user' && userPassword === 'my@super.user') {
      dispatch(signInMockUser({ email: 'my@super.user', firstName: 'Иван', lastName: 'Иванов' }));
      dispatch(closePopup());
      navigate('/add-stickers');
      localStorage.setItem('token', 'moc');
      return;
    }
    setLoading(true);
    dispatch(signIn({ email: userEmail, password: userPassword }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getUser());
          dispatch(updateStatus(true));
          dispatch(closePopup());
          navigate('/add-stickers');
        }

        if (res.meta.requestStatus === 'rejected') {
          dispatch(
            openMessage({
              text: 'Неверная почта или пароль',
              isError: true,
            }),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <motion.form
      className={cn(styles.signin)}
      onSubmit={handleSubmit(onSubmit)}
      initial={{
        opacity: 0.1,
      }}
      animate={{
        transition: {
          duration: 0.5,
        },
        opacity: 1,
      }}
      exit={{
        opacity: 0.2,

        transition: {
          duration: 0.5,
        },
      }}
    >
      <TitlePopup>Вход</TitlePopup>
      <div className={styles.inputs}>
        <InputField className='email'>
          <Label htmlFor='email'>Электронная почта</Label>
          <Input
            placeholder='example@gmail.com'
            autoComplete='email'
            register={register}
            option={{
              ...registerEmail,
              onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                setValue('email', value.target.value.trim());
              },
            }}
            name='email'
            error={errors.email}
          />
          <InputError error={errors.email} />
        </InputField>
        <InputField className='password'>
          <Label htmlFor='password'>
            Пароль
            <TextUnderline
              onClick={() => dispatch(openPopup(ResetPassword))}
              className={styles.reset}
            >
              Забыли пароль?
            </TextUnderline>
          </Label>
          <InputWithButton
            placeholder='Введите пароль'
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
      </div>
      <ButtonWithText type='submit' disabled={!isValid} loading={loading}>
        Войти
      </ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          Нет аккаунта?{' '}
          <TextUnderline onClick={() => dispatch(openPopup(Signup))} type='button'>
            Зарегистрироваться
          </TextUnderline>
        </span>
      ) : null}
    </motion.form>
  );
};

export { Signin };
