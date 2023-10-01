import { useEffect, useState } from 'react';
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
} from '@components/UI';
import { Signin } from '@components/Popups';
import { useAppDispatch } from '@shared/hooks';
import {
  signUp,
  signIn,
  sendVerificationCode,
  openMessage,
  openPopup,
  closePopup,
  openInfo,
  getUser,
  updateStatus,
} from '@shared/store';
import { registerEmail, registerPassword } from '@utils/registersRHF';
import { ADD_STICKERS, PRIVACY, TERMS, getRandomNumber } from '@utils/constants';
import { messages, signup, verifyPlease } from '@static/popups';

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

  useEffect(() => {
    setValue('confirmCheckbox', 'checked');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                title: `${verifyPlease.title}`,
                text: `${verifyPlease.text}`,
                buttonText: `${verifyPlease.buttonText}`,
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
                  text: `${messages.somethingWrong}`,
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
            message: `${signup.error}`,
          });
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
      <TitlePopup>{signup.title}</TitlePopup>
      <div className={styles.inputs}>
        <InputField className='email'>
          <Label htmlFor='email'>{signup.email.emailLabel}</Label>
          <Input
            autoComplete='email'
            placeholder={signup.email.emailPlaceholder}
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
          <Label htmlFor='password'>{signup.password.passwordLabel}</Label>
          <InputWithButton
            register={register}
            option={registerPassword}
            name='password'
            className={dirtyFields?.password && watch('password') !== '' && !statePassword ? styles.password : ''}
            placeholder={signup.password.passwordPlaceholder}
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
          <Label htmlFor='repeat-password'>{signup.passwordRepeat.passwordRepeatLabel}</Label>
          <InputWithButton
            register={register}
            option={{
              validate: (val: string) => {
                if (val !== watch('password')) {
                  return signup.errorMatch;
                }
              },
            }}
            placeholder={signup.passwordRepeat.passwordRepeatPlaceholder}
            name='repeat-password'
            className={
              dirtyFields['repeat-password'] && watch('repeat-password') !== '' && !stateRepeatPassword
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
      <ButtonWithText type='submit' disabled={!isValid} loading={loading} className={styles.button}>
        {signup.button}
      </ButtonWithText>
      <span className={styles.link}>
        {signup.link.label}{' '}
        <TextUnderline type='button' onClick={() => dispatch(openPopup(Signin))}>
          {signup.link.text}
        </TextUnderline>
      </span>
    </motion.form>
  );
};

export { Signup };
