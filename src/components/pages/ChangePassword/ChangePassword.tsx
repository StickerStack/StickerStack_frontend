import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { setMessageIsOpen } from '../../../store/popupSlice';
import { ButtonWithText, Container, InputForm, TitleForm } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { resetPassword } from '../../../store/authSlice';
import { registerPassword } from '../../../utils/registersRHF';
import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(resetPassword({ token: token, password: data.newPassword })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Пароль успешно изменен',
            messageIsError: false,
          }),
        );
      }
      if (res.meta.requestStatus === 'rejected') {
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Ошибка при попытке сменить пароль',
            messageIsError: true,
          }),
        );
      }
    });
  };

  useEffect(() => {
    setToken(location.pathname.replace('/auth/verify-forgot-password/', ''));

    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <Container className={styles.container}>
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
              visible: dirtyFields.newPassword && watch('newPassword') !== '',
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
              visible: dirtyFields.newPasswordCheck && watch('newPasswordCheck') !== '',
            }}
          />
          <ButtonWithText type='submit'>Изменить пароль</ButtonWithText>
        </form>
      </Container>
    </section>
  );
};

export { ChangePassword };
