import { useDispatch } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signin } from '../Signin';

import styles from './ResetPassword.module.scss';
import { switchForm } from '../../store/formSlice';
import { TextForm } from '../UI/TextForm';
import { registerEmail } from '../../utils/registersRHF';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm
        label='E-mail Вашего аккаунта'
        name='email'
        placeholder='vashapochta@gmail.com'
        register={{ ...register('email', registerEmail) }}
        error={errors?.email?.message ? `${errors?.email?.message}` : ''}
      />
      <TextForm>Мы направим ссылку на Вашу почту для восстановления пароля</TextForm>
      <ButtonSubmit>Восстановить пароль</ButtonSubmit>
      <button className={styles.button} onClick={() => dispatch(switchForm(Signin))}>
        <span className={styles.button_text}>Вернуться назад</span>
      </button>
    </form>
  );
};

export { ResetPassword };
