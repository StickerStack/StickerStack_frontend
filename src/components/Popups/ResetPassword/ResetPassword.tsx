import { FieldValues, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Signin, Signup } from '../..';
import { ButtonWithText, TextForm, TextUnderline, TitlePopup, Input } from '../../UI';
import { ResetPasswordInfo } from '../ResetPasswordInfo/ResetPasswordInfo';
import { InputField } from '../../UI/InputField/InputField';
import { Label } from '../../UI/Label';
import { InputError } from '../../UI/InputError/InputError';

import { useAppDispatch } from '../../../hooks/hooks';
import { forgotPassword } from '../../../store/authSlice';
import { openMessage, openPopup } from '../../../store/popupSlice';
import { registerEmail } from '../../../utils/registersRHF';
import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    dispatch(forgotPassword({ email: data.email }))
      .unwrap()
      .then(() => {
        localStorage.setItem('email', data.email);
        dispatch(openPopup(ResetPasswordInfo));
      })
      .catch((err) => {
        if (err.message) {
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
      className={styles.resetpassword}
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
      <TitlePopup>Восстановление пароля</TitlePopup>
      <InputField className='email'>
        <Label>Электронная почта</Label>
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
        <p className={styles.text}>
          В&nbsp;течение 5&nbsp;минут на&nbsp;указанную почту придет ссылка для восстановления
          пароля
        </p>
      </InputField>

      <ButtonWithText type='submit' className={styles.button} disabled={!isValid} loading={loading}>
        Восстановить пароль
      </ButtonWithText>
      <div className={styles.buttons}>
        <TextUnderline type='button' onClick={() => dispatch(openPopup(Signin))}>
          Войти
        </TextUnderline>
        <TextUnderline type='button' onClick={() => dispatch(openPopup(Signup))}>
          Зарегистрироваться
        </TextUnderline>
      </div>
    </motion.form>
  );
};

export { ResetPassword };
