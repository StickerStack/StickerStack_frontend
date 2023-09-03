import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ButtonWithText,
  CheckBoxForm,
  TitlePopup,
  TextUnderline,
  EyeButton,
  Input,
  Label,
  InputField,
  InputError,
  InputWithButton,
} from '../../UI';
import { Signin } from '../Signin/Signin';

import { useAppDispatch } from '../../../hooks/hooks';
import { openMessage, openPopup, closePopup, openInfo } from '../../../store/popupSlice';
import { getUser, updateStatus } from '../../../store/userSlice';
import { signUp, signIn, sendVerificationCode } from '../../../store/authSlice';
import { registerEmail, registerPassword } from '../../../utils/registersRHF';
import { ADD_STICKERS, PRIVACY, TERMS, getRandomNumber } from '../../../utils/constants';

import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    getValues,
    formState: { errors, dirtyFields, isValid },
    setError,
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const [statePassword, setStatePasswod] = useState(false);
  const [stateRepeatPassword, setStateRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    setLoading(true);
    dispatch(signUp({ email: userEmail, password: userPassword }))
      .unwrap()
      .then(() => {
        dispatch(signIn({ email: userEmail, password: userPassword }))
          .unwrap()
          .then(() => {
            dispatch(getUser());
            dispatch(updateStatus(true));
            dispatch(closePopup());
            navigate(ADD_STICKERS);
            const randomNumber = getRandomNumber(1, 3);
            dispatch(
              openInfo({
                title: 'Подтвердите вашу почту',
                text: 'Мы направили письмо на вашу электронную почту, оно придет в течение 5 минут. Для подтверждения профиля перейдите по ссылке в письме.',
                buttonText: 'Понятно!',
                image: require(`../../../images/check-your-mail-${randomNumber}.png`),
              }),
            );
          })
          .then(() => {
            dispatch(sendVerificationCode());
          })
          .catch((err) => {
            if (err.message === '400') {
              dispatch(
                openMessage({
                  text: 'Неверная почта или пароль',
                  isError: true,
                }),
              );
            } else {
              dispatch(
                openMessage({
                  text: 'Что-то пошло не так. Попробуйте еще раз.',
                  isError: true,
                }),
              );
            }
          });
      })
      .catch((err) => {
        if (err.message === '400') {
          setError('email', {
            type: 'custom',
            message: 'Учетная запись с такой почтой уже существует',
          });
        } else if (err.message === '422') {
          dispatch(
            openMessage({
              text: 'Ошибка при заполнении полей. Попробуйте поменять значения.',
              isError: true,
            }),
          );
        } else {
          dispatch(
            openMessage({
              text: 'Что-то пошло не так. Попробуйте еще раз.',
              isError: true,
            }),
          );
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.signup}
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
      <TitlePopup>Регистрация</TitlePopup>
      <div className={styles.inputs}>
        <InputField className='email'>
          <Label htmlFor='email'>Электронная почта</Label>
          <Input
            autoComplete='email'
            placeholder='example@gmail.com'
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
          <Label htmlFor='password'>Пароль</Label>
          <InputWithButton
            register={register}
            option={registerPassword}
            name='password'
            className={
              dirtyFields?.password && watch('password') !== '' && !statePassword
                ? styles.password
                : ''
            }
            placeholder='Введите пароль'
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
        <InputField className='password'>
          <Label htmlFor='repeat-password'>Подтвердить пароль</Label>
          <InputWithButton
            register={register}
            option={{
              validate: (val: string) => {
                if (val !== watch('password')) {
                  return 'Пароли не совпадают';
                }
              },
            }}
            placeholder='Введите пароль'
            name='repeat-password'
            className={
              dirtyFields['repeat-password'] &&
              watch('repeat-password') !== '' &&
              !stateRepeatPassword
                ? styles.password
                : ''
            }
            type={stateRepeatPassword ? 'text' : 'password'}
            autoComplete='repeat-password'
            error={errors['repeat-password']}
            button={
              <EyeButton
                onClick={() => setStateRepeatPassword(!stateRepeatPassword)}
                shown={stateRepeatPassword}
                visible={dirtyFields['repeat-password'] && watch('repeat-password') !== '' && true}
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
          <a href={PRIVACY} target='_blank' rel='noreferrer' className={styles.documentLink}>
            Политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href={TERMS} target='_blank' rel='noreferrer' className={styles.documentLink}>
            Условиями использования сервиса
          </a>
        </p>
      </CheckBoxForm>
      <ButtonWithText type='submit' disabled={!isValid} loading={loading}>
        Зарегистрироваться
      </ButtonWithText>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <TextUnderline type='button' onClick={() => dispatch(openPopup(Signin))}>
          Войти
        </TextUnderline>
      </span>
    </motion.form>
  );
};

export { Signup };
