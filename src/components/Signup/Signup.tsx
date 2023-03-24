import { useForm } from 'react-hook-form';

import { ButtonSubmit, InputForm, CheckBoxForm, TitleForm } from '../UI';
import { Signin } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen, switchForm } from '../../store/popupSlice';
import { signUp } from '../../store/userSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
      confirmCheckbox: false,
    },
  });

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    dispatch(signUp({ email: userEmail, password: userPassword }))
      .then((res) => {
        if(res.meta.requestStatus === 'fulfilled') {
          dispatch(setMessageIsOpen({ messageIsOpen: true, message: 'Вы успешно зарегистрировались!' }));
          dispatch(switchForm(Signin));
        }

        if(res.meta.requestStatus === 'rejected' && res.payload === '400') {
          dispatch(setMessageIsOpen({ messageIsOpen: true, message: 'Учётная запись с такой почтой уже существует' }));
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm placeholder='example@gmail.com' name='email' label='E-mail' type='email' register={{ ...register('email', registerEmail) }} error={errors?.email?.message ? `${errors?.email?.message}` : ''} />
        <InputForm
          placeholder='Введите пароль'
          name='password'
          label='Пароль'
          type='password'
          register={{ ...register('password', registerPassword) }}
          error={errors?.password?.message ? `${errors?.password?.message}` : ''}
          optionalEyeButton={{
            visible: watch('password') !== (undefined || ''),
          }}
        />
        <InputForm
          placeholder='Повторите пароль'
          name='passwordCheck'
          label='Подтвердите пароль'
          type='password'
          register={{
            ...register('passwordCheck', {
              ...registerPassword,
              validate: (val: string) => {
                if (val !== watch('password')) {
                  return 'Пароли не совпадают';
                }
              },
              required: 'Введи пароль повторно',
            }),
          }}
          error={errors?.passwordCheck?.message ? `${errors?.passwordCheck?.message}` : ''}
          optionalEyeButton={{
            visible: watch('passwordCheck') !== (undefined || ''),
          }}
        />
      </div>
      <CheckBoxForm name='confirmCheckbox' register={register('confirmCheckbox', { required: true })} error={errors?.confirmCheckbox ? true : false}>
        <p className={styles.checktext}>
          Я согласен с{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Условиями использования сервиса
          </a>
        </p>
      </CheckBoxForm>
      <ButtonSubmit>Зарегистрироваться</ButtonSubmit>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <button type='button' onClick={() => dispatch(switchForm(Signin))} className={styles.button}>
          <span className={styles.text}>Войти</span>
        </button>
      </span>
    </form>
  );
};

export { Signup };
