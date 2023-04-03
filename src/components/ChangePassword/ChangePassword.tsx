import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { InputForm, TitleForm, ButtonSubmit } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { resetPassword } from '../../store/userSlice';
import { registerPassword } from '../../utils/registersRHF';
import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const location = useLocation();
  const [token, setToken] = useState<string>('');
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(resetPassword({token: token, password: data.newPassword}));
  };

  useEffect(() => {
    setToken(location.pathname.replace('/auth/verify-forgot-password/', ''));
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Смена пароля</TitleForm>
        <InputForm
          register={register}
          option={registerPassword}
          error={errors?.newPassword}
          placeholder='Введите новый пароль'
          name='newPassword'
          label='Новый пароль'
          type='password'
          optionalEyeButton={{
            visible: watch('newPassword') !== (undefined || ''),
          }}
        />
        <InputForm
          register={register}
          option={{
            ...registerPassword,
            validate: (val: string) => {
              if (val !== watch('newPassword')) {
                return 'Пароли не совпадают';
              }
            },
            required: 'Введи пароль повторно',
          }}
          error={errors?.newPasswordCheck}
          placeholder='Повторите пароль'
          name='newPasswordCheck'
          label='Повторите пароль'
          type='password'
          optionalEyeButton={{
            visible: watch('newPasswordCheck') !== (undefined || ''),
          }}
        />
        <ButtonSubmit>Изменить пароль</ButtonSubmit>
      </form>
    </div>
  );
};

export { ChangePassword };
