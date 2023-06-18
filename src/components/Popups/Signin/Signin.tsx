import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonWithText, TitlePopup, InputForm, TextUnderline } from '../../UI';
import { Signup, ResetPassword } from '../..';
import {
  setFormIsOpen,
  setInfoIsOpen,
  setMessageIsOpen,
  switchForm,
} from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { getUser, signInMockUser, updateStatus } from '../../../store/userSlice';
import { signIn } from '../../../store/authSlice';
import { registerEmail, registerPassword } from '../../../utils/registersRHF';
import styles from './Signin.module.scss';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, dirtyFields, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    if (userEmail === 'my@super.user' && userPassword === 'my@super.user') {
      dispatch(signInMockUser({ email: 'my@super.user', firstName: 'Иван', lastName: 'Иванов' }));
      dispatch(setFormIsOpen(false));
      navigate('/add-stickers');
      dispatch(
        setInfoIsOpen({
          infoIsOpen: true,
          title: 'Добро пожаловать',
          text: 'Рады вас видеть снова. Закажите стикеры своей мечты',
          buttonText: 'Начать!',
        }),
      );
      localStorage.setItem('token', 'moc');
      return;
    }

    dispatch(signIn({ email: userEmail, password: userPassword }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getUser());
          dispatch(updateStatus(true));
          dispatch(setFormIsOpen(false));
          navigate('/add-stickers');
        }

        if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
          dispatch(
            setMessageIsOpen({
              messageIsOpen: true,
              message: 'Неверная почта или пароль',
              messageIsError: true,
            }),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={styles.signin} onSubmit={handleSubmit(onSubmit)}>
      <TitlePopup>Вход</TitlePopup>
      <div className={styles.inputs}>
        <InputForm
          register={register}
          option={{
            ...registerEmail,
            onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
              setValue('email', value.target.value.trim());
            },
          }}
          error={errors?.email}
          placeholder='Электронная почта'
          name='email'
          label='Электронная почта'
          type='email'
        />
        <InputForm
          register={register}
          option={{
            ...registerPassword,
            validate: (val: string) => {
              if (val.indexOf(' ') >= 0) {
                return '';
              }
            },
          }}
          error={errors?.password}
          placeholder='Пароль'
          name='password'
          label='Пароль'
          type='password'
          optionalButton={
            !location.pathname.startsWith('/api/auth/verifyemail')
              ? {
                  text: 'Забыли пароль?',
                  onClick: () => {
                    dispatch(switchForm(ResetPassword));
                  },
                }
              : {
                  text: '',
                  onClick: () => {
                    return;
                  },
                }
          }
          optionalEyeButton={{
            visible: dirtyFields.password && watch('password') !== '',
          }}
        />
      </div>
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid}>
        Войти
      </ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          Нет аккаунта?{' '}
          <TextUnderline onClick={() => dispatch(switchForm(Signup))} type='button'>
            Зарегистрироваться
          </TextUnderline>
        </span>
      ) : null}
    </form>
  );
};

export { Signin };
