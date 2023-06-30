import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { ButtonWithText, TitlePopup, TextUnderline, Input, EyeButton } from '../../UI';
import { InputField } from '../../UI/InputField/InputField';
import { Label } from '../../UI/Label';
import { InputError } from '../../UI/InputError/InputError';
import { InputWithButton } from '../../UI/InputWithButton/InputWithButton';
import { Signup } from '../Signup/Signup';
import { ResetPassword } from '../ResetPassword/ResetPassword';
import { closePopup, openPopup, openMessage } from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUser, signInMockUser, updateStatus } from '../../../store/userSlice';
import { signIn } from '../../../store/authSlice';
import { registerEmail, registerPassword } from '../../../utils/registersRHF';

import styles from './Signin.module.scss';

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
  } = useForm({
    mode: 'onBlur',
  });

  const [statePassword, setStatePasswod] = useState(false);

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
      });
  };

  return (
    <form className={styles.signin} onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonWithText type='submit'>Войти</ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          Нет аккаунта?{' '}
          <TextUnderline onClick={() => dispatch(openPopup(Signup))} type='button'>
            Зарегистрироваться
          </TextUnderline>
        </span>
      ) : null}
    </form>
  );
};

export { Signin };
