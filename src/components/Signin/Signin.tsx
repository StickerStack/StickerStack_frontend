import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonWithText, TitleForm, TextUnderline, Input, EyeButton } from '../UI';
import { Signup, ResetPassword } from '../';
import { setIsOpen, setMessageIsOpen, switchForm } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { getUser, signInMockUser, updateStatus } from '../../store/userSlice';
import { signIn } from '../../store/authSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signin.module.scss';
import { InputField } from '../UI/InputField/InputField';
import { Label } from '../UI/Label';
import { InputError } from '../UI/InputError/InputError';
import { InputWithButton } from '../UI/InputWithButton/InputWithButton';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const [statePassword, setStatePasswod] = useState(false);

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    if (userEmail === 'my@super.user' && userPassword === 'my@super.user') {
      dispatch(signInMockUser({ email: 'my@super.user', firstName: 'Иван', lastName: 'Иванов' }));
      dispatch(setIsOpen(false));
      navigate('/add-stickers');
      localStorage.setItem('token', 'moc');
      return;
    }

    dispatch(signIn({ email: userEmail, password: userPassword }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getUser());
          dispatch(updateStatus(true));
          dispatch(setIsOpen(false));
          navigate('/add-stickers');
        }

        if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
          dispatch(
            setMessageIsOpen({
              messageIsOpen: true,
              message: 'Неверная почта или пароль',
              messageIsError: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={styles.signin} onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Вход</TitleForm>
      <div className={styles.inputs}>
        <InputField className='email'>
          <Label htmlFor='email'>Электронная почта</Label>
          <Input
            placeholder='example@gmail.com'
            autoComplete='email'
            register={register}
            option={registerEmail}
            name='email'
            error={errors.email}
          />
          <InputError error={errors.email} />
        </InputField>
        <InputField className='password'>
          <Label htmlFor='password'>
            Пароль
            <TextUnderline onClick={() => dispatch(switchForm(ResetPassword))}>Забыли пароль?</TextUnderline>
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
      <ButtonWithText type='submit'>Войти</ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          Нет аккаунта?{' '}
          <TextUnderline onClick={() => dispatch(switchForm(Signup))} type='button'>
            Зарегистрироваться
          </TextUnderline>
        </span>
      ) : null}
    </form>
  );
};

export { Signin };
