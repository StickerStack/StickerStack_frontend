import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonSubmit, InputForm, CheckBoxForm, TitleForm } from '../UI';
import { Signin } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen, switchForm, setIsOpen } from '../../store/popupSlice';
import { signUp, signIn, getUser } from '../../store/userSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    dispatch(signUp({ email: userEmail, password: userPassword })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(setIsOpen(false));
        dispatch(signIn({ email: userEmail, password: userPassword }));
        dispatch(getUser());
        navigate('/add-stickers');
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Подтвердите почту',
          }),
        );
      }

      if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Учётная запись с такой почтой уже существует',
          }),
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          register={register}
          option={registerEmail}
          error={errors?.email}
          placeholder='example@gmail.com'
          name='email'
          label='E-mail'
          type='email'
        />
        <InputForm
          register={register}
          option={registerPassword}
          error={errors?.password}
          placeholder='Введите пароль'
          name='password'
          label='Пароль'
          type='password'
          optionalEyeButton={{
            visible: watch('password') !== (undefined || ''),
          }}
        />

        <InputForm
          register={register}
          option={{
            ...registerPassword,
            validate: (val: string) => {
              if (val !== watch('password')) {
                return 'Пароли не совпадают';
              }
            },
            required: 'Введи пароль повторно',
          }}
          error={errors?.passwordCheck}
          placeholder='Подтвердите пароль'
          name='passwordCheck'
          label='Подтвердите пароль'
          type='password'
          optionalEyeButton={{
            visible: watch('passwordCheck') !== (undefined || ''),
          }}
        />
      </div>
      <CheckBoxForm
        name='confirmCheckbox'
        register={register('confirmCheckbox', { required: true })}
        error={errors?.confirmCheckbox ? true : false}
      >
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
        <button
          type='button'
          onClick={() => dispatch(switchForm(Signin))}
          className={styles.button}
        >
          <span className={styles.text}>Войти</span>
        </button>
      </span>
    </form>
  );
};

export { Signup };
