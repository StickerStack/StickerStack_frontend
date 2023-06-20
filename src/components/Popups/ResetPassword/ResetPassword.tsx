import { FieldValues, useForm } from 'react-hook-form';

import { Signin, Signup } from '../..';
import { ButtonWithText, TextForm, TextUnderline, TitlePopup, Input } from '../../UI';
import { InputField } from '../../UI/InputField/InputField';
import { Label } from '../../UI/Label';
import { InputError } from '../../UI/InputError/InputError';
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
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(forgotPassword({ email: data.email })).then(() => {
      localStorage.setItem('email', data.email);
      dispatch(switchForm(ResetPasswordInfo));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetpassword}>
      <TitlePopup>Восстановление пароля</TitlePopup>
      <InputField className='email'>
        <Label>Электронная почта</Label>
        <Input
          autoComplete='email'
          placeholder='example@gmail.com'
          register={register}
          option={registerEmail}
          name='email'
          error={errors.email}
        />
        <InputError error={errors.email} />
      </InputField>
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