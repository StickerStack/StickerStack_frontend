import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonWithText, TitleForm, InputForm, TextUnderline } from '../UI';
import { Signup, ResetPassword, SocialsAuth } from '../';
import { setIsOpen, setMessageIsOpen, switchForm } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { getUser, signInMockUser, updateStatus } from '../../store/userSlice';
import { signIn } from '../../store/authSlice';
import { registerEmail, registerPassword } from '../../utils/registersRHF';
import styles from './Signin.module.scss';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
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
      dispatch(setIsOpen(false));
      navigate('/add-stickers');
      localStorage.setItem('token', 'moc');
      return;
    }

    dispatch(signIn({ email: userEmail, password: userPassword }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getUser());
          dispatch(updateStatus(true));
          dispatch(setIsOpen(false));
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
      <TitleForm>Вход</TitleForm>
      <SocialsAuth />
      <div className={styles.inputs}>
        <InputForm
          register={register}
          option={registerEmail}
          error={errors?.email}
          placeholder='E-mail'
          name='email'
          label='E-mail'
          type='email'
        />
        <InputForm
          register={register}
          option={registerPassword}
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
      <ButtonWithText type='submit' disabled={!isValid} className={styles.button}>
        Войти
      </ButtonWithText>
      {!location.pathname.startsWith('/api/auth/verifyemail') ? (
        <span className={styles.link}>
          Нет аккаунта?{' '}
          <TextUnderline
            onClick={() => dispatch(switchForm(Signup))}
            type='button'
            className={styles.link}
          >
            Зарегистрироваться
          </TextUnderline>
        </span>
      ) : null}
    </form>
  );
};

export { Signin };
