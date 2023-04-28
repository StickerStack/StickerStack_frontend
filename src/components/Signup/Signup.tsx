import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonWithText, InputForm, CheckBoxForm, TitleForm, TextUnderline } from '../UI';
import { Signin } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen, switchForm, setIsOpen } from '../../store/popupSlice';
import { getUser, updateStatus } from '../../store/userSlice';
import { signUp, signIn } from '../../store/authSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    formState: { errors, dirtyFields },
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
        dispatch(signIn({ email: userEmail, password: userPassword })).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(getUser());
            dispatch(updateStatus(true));
            dispatch(setIsOpen(false));
            navigate('/add-stickers');
            dispatch(
              setMessageIsOpen({
                messageIsOpen: true,
                message: 'Подтвердите почту',
                messageIsError: false,
              }),
            );
          }
        });
      }
      if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Учётная запись с такой почтой уже существует',
            messageIsError: true,
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
            visible: dirtyFields.password && watch('password') !== '',
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
            visible: dirtyFields.passwordCheck && watch('passwordCheck') !== '',
          }}
        />
      </div>
      <CheckBoxForm
        name='confirmCheckbox'
        register={register}
        option={{ required: 'Обязательное поле' }}
        error={errors?.confirmCheckbox}
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
      <ButtonWithText type='submit'>Зарегистрироваться</ButtonWithText>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <TextUnderline type='button' onClick={() => dispatch(switchForm(Signin))}>
          Войти
        </TextUnderline>
      </span>
    </form>
  );
};

export { Signup };
