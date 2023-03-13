import { useForm } from 'react-hook-form';

import { InputForm, TitleForm, ButtonSubmit } from '../UI';

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
    defaultValues: {
      newPassword: '',
      newPasswordCheck: '',
    },
  });

  const onSubmit = () => {
    console.log('РАБОТАЕТ');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Смена пароля</TitleForm>
        <InputForm
          name='newPassword'
          label='Новый пароль'
          type='password'
          register={register('newPassword', registerPassword)}
          error={
            errors?.newPassword?.message
              ? `${errors?.newPassword?.message}`
              : ''
          }
          optionalEyeButton={{
            visible: watch('newPassword') !== (undefined || ''),
          }}
        />
        <InputForm
          name='newPasswordCheck'
          label='Повторите пароль'
          type='password'
          register={{
            ...register('newPasswordCheck', {
              ...registerPassword,
              validate: (val: string) => {
                if (val !== watch('newPassword')) {
                  return 'Пароли не совпадают';
                }
              },
              required: 'Введи пароль повторно',
            }),
          }}
          error={
            errors?.newPasswordCheck?.message
              ? `${errors?.newPasswordCheck?.message}`
              : ''
          }
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
