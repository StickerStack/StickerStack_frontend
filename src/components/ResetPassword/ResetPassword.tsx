import { motion } from 'framer-motion';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Signin } from '../';
import { ButtonWithText, Input, TitleForm } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { forgotPassword } from '../../store/authSlice';
import { switchForm } from '../../store/popupSlice';
import { registerEmail } from '../../utils/registersRHF';

import styles from './ResetPassword.module.scss';
import { InputField } from '../UI/InputField/InputField';
import { Label } from '../UI/Label';
import { InputError } from '../UI/InputError/InputError';

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
      <InputField className='email'>
        <Label>Электронная почта</Label>
        <Input
          autoComplete='email'
          register={register}
          option={registerEmail}
          name='email'
          error={errors.email}
        />
        <InputError error={errors.email} />
      </InputField>
      {formSubmit && (
        <motion.span
          style={{ position: 'absolute', width: '310px', top: '125px' }}
          initial={{
            opacity: 0,
          }}
          animate={{
            transition: {
              duration: 0.5,
            },
            opacity: 1,
          }}
        >
          Мы направим ссылку на Вашу почту для восстановления пароля
        </motion.span>
      )}
      <ButtonWithText type='submit'>Восстановить пароль</ButtonWithText>
      <button className={styles.button_back} onClick={() => dispatch(switchForm(Signin))}>
        <span className={styles.button_back_text}>Вернуться назад</span>
      </button>
    </form>
  );
};

export { ResetPassword };
