import { useForm } from 'react-hook-form';

import { NewInput, TitleForm, ButtonSubmit } from '../UI';

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

  const onSubmit = () => {
    console.log('РАБОТАЕТ');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Смена пароля</TitleForm>
        <NewInput
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
        <NewInput
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
