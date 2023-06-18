import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Signin, Signup } from '../..';
import { ButtonWithText, InputForm, TextForm, TextUnderline, TitlePopup } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { forgotPassword } from '../../../store/authSlice';
import { switchForm } from '../../../store/popupSlice';
import { registerEmail } from '../../../utils/registersRHF';

import styles from './ResetPassword.module.scss';
import { ResetPasswordInfo } from '../ResetPasswordInfo/ResetPasswordInfo';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const onSubmit = (data: FieldValues) => {
    dispatch(forgotPassword({ email: data.email })).then(() => {
      setFormSubmit(true);
      dispatch(switchForm(ResetPasswordInfo));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetpassword}>
      <TitlePopup>Восстановление пароля</TitlePopup>
      <InputForm
        register={register}
        option={{
          ...registerEmail,
          onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
            setValue('email', value.target.value.trim());
          },
        }}
        error={errors?.email}
        placeholder='Электронная почта'
        name='email'
        label='Электронная почта'
        type='email'
      />
      <TextForm>На эту почту мы отправим ссылку для восстановления пароля</TextForm>
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid}>
        Восстановить пароль
      </ButtonWithText>
      <div className={styles.buttons}>
        <TextUnderline type='button' onClick={() => dispatch(switchForm(Signin))}>
          Войти
        </TextUnderline>
        <TextUnderline type='button' onClick={() => dispatch(switchForm(Signup))}>
          Зарегистрироваться
        </TextUnderline>
      </div>
    </form>
  );
};

export { ResetPassword };
