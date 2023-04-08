import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';

import { ButtonWithText, InputForm, TextForm, TitleForm } from '../UI';
import { Signin, TransitionsComponent } from '../';

import { switchForm } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { registerEmail } from '../../utils/registersRHF';
import { forgotPassword } from '../../store/userSlice';
import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [formSubmit, setFormSubmit] = useState<boolean>(false);


  const onSubmit = (data: FieldValues) => {
    dispatch(forgotPassword({ email: data.email })).then(() => setFormSubmit(true));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm
        register={register}
        option={registerEmail}
        error={errors?.email}
        placeholder='Введите E-mail'
        name='email'
        label='E-mail'
        type='email'
      />
      
      <TransitionsComponent timeout={300} state={formSubmit}>
        <TextForm>Мы направим ссылку на Вашу почту для восстановления пароля</TextForm>
      </TransitionsComponent>

      <ButtonWithText type='submit'>Восстановить пароль</ButtonWithText>
      <button className={styles.button_back} onClick={() => dispatch(switchForm(Signin))}>
        <span className={styles.button_back_text}>Вернуться назад</span>
      </button>
    </form>
  );
};

export { ResetPassword };
