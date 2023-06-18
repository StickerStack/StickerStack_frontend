import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { setInfoIsOpen, setMessageIsOpen } from '../../../store/popupSlice';
import { ButtonWithText, InputForm, TitlePopup } from '../../UI';
import { useAppDispatch } from '../../../hooks/hooks';
import { resetPassword } from '../../../store/authSlice';
import { registerPassword, registerRepeatPassword } from '../../../utils/registersRHF';
import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {
    register,
    formState: { errors, dirtyFields, isValid },
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
        // dispatch(
        //   setMessageIsOpen({
        //     messageIsOpen: true,
        //     message: 'Пароль успешно изменен',
        //     messageIsError: false,
        //   }),
        // );
        dispatch(
          setInfoIsOpen({
            infoIsOpen: true,
            title: 'Пароль изменён',
            text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке. ',
            buttonText: 'Начать!',
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TitlePopup>Смена пароля</TitlePopup>
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
        error={errors?.newPassword}
        placeholder='Новый пароль'
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
          ...registerRepeatPassword,
          validate: (val: string) => {
            if (val !== watch('newPassword')) {
              return 'Пароли не совпадают';
            }
          },
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
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid}>
        Изменить пароль
      </ButtonWithText>
    </form>
  );
};

export { ChangePassword };
