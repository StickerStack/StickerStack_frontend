import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  ButtonWithText,
  TitlePopup,
  TextUnderline,
  Input,
  Error,
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
import { motion } from 'framer-motion';
import { ADD_STICKERS } from '../../../utils/constants';
import { messages, signin } from '../../../utils/content/popups';

import styles from './Signin.module.scss';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, dirtyFields, isValid },
    watch,
    setError,
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
      .unwrap()
      .then(() => {
        dispatch(getUser());
        dispatch(updateStatus(true));
        dispatch(closePopup());
        navigate(ADD_STICKERS);
      })
      .catch((err) => {
        if (err.message === '400') {
          setError('email', { type: 'custom', message: '' });
          setError('password', { type: 'custom', message: '' });
        } else if (err.message === '422') {
          dispatch(
            openMessage({
              text: `${messages.fieldsError}`,
              isError: true,
            }),
          );
        } else {
          dispatch(
            openMessage({
              text: `${messages.somethingWrong}`,
              isError: true,
            }),
          );
        }
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
      <TitlePopup>{signin.title}</TitlePopup>
      <div className={styles.inputs}>
        {(errors.email?.type === 'custom' || errors.password?.type === 'custom') && (
          <Error>{signin.error}</Error>
        )}
        <InputField className='email'>
          <Label htmlFor='email'>{signin.email.emailLabel}</Label>
          <Input
            placeholder={signin.email.emailPlaceholder}
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
            {signin.password.passwordLabel}
            <TextUnderline
              onClick={() => dispatch(openPopup(ResetPassword))}
              className={styles.reset}
            >
              {signin.password.forgotPassword}
            </TextUnderline>
          </Label>
          <InputWithButton
            placeholder={signin.password.passwordPlaceholder}
            register={register}
            option={registerPassword}
            name='password'
            className={
              dirtyFields?.password && watch('password') !== '' && !statePassword
                ? styles.password
                : ''
            }
            type={statePassword ? 'text' : 'password'}
            autoComplete='current-password'
            error={errors.password}
            button={
              <EyeButton
                onClick={() => setStatePasswod(!statePassword)}
                shown={statePassword}
                visible={dirtyFields?.password && watch('password') !== '' && true}
              />
            }
          />
          <InputError error={errors.password} />
        </InputField>
      </div>
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid} loading={loading}>
        {signin.button}
      </ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          {signin.link.label}{' '}
          <TextUnderline onClick={() => dispatch(openPopup(Signup))} type='button'>
            {signin.link.text}
          </TextUnderline>
        </span>
      ) : null}
    </motion.form>
  );
};

export { Signin };
