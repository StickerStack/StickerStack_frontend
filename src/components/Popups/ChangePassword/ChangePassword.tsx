import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { InputWithButton } from '../../UI/InputWithButton/InputWithButton';
import { InputError } from '../../UI/InputError/InputError';
import { InputField } from '../../UI/InputField/InputField';
import { Label } from '../../UI/Label';
import { closePopup, openInfo, openMessage } from '../../../store/popupSlice';
import { ButtonWithText, TitlePopup, EyeButton } from '../../UI';
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

  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const dispatch = useAppDispatch();

  const [statePassword, setStatePasswod] = useState(false);
  const [stateRepeatPassword, setStateRepeatPassword] = useState(false);

  const onSubmit = (data: FieldValues) => {
    dispatch(resetPassword({ token: token, password: data.password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
        // dispatch(
        //   setMessageIsOpen({
        //     messageIsOpen: true,
        //     message: 'Пароль успешно изменен',
        //     messageIsError: false,
        //   }),
        // );

        dispatch(closePopup());
        dispatch(
          openInfo({
            title: 'Пароль изменён',
            text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке. ',
            buttonText: 'Начать!',
          })
        );
        localStorage.removeItem('change-password-token');
      } else if (res.meta.requestStatus === 'rejected' && res.payload === 422) {
        dispatch(
          openMessage({
            text: 'Новый пароль не должен совпадать со старым',
            isError: true,
          })
        );
      } else if (res.meta.requestStatus === 'rejected') {
        dispatch(
          openMessage({
            text: 'Ошибка при попытке сменить пароль',
            isError: true,
          })
        );
      }
    });
  };

  useEffect(() => {
    const localToken = localStorage.getItem('change-password-token');
    if (localToken) {
      setToken(localToken);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TitlePopup>Смена пароля</TitlePopup>
      <InputField className='password'>
        <Label htmlFor='password'>Новый пароль</Label>
        <InputWithButton
          register={register}
          placeholder='Введите пароль'
          option={registerPassword}
          name='password'
          type={statePassword ? 'text' : 'password'}
          autoComplete='current-password'
          error={errors.password}
          button={
            <EyeButton
              onClick={() => setStatePasswod(!statePassword)}
              shown={statePassword}
              visible={dirtyFields?.password && true}
            />
          }
        />
        <InputError error={errors.password} />
      </InputField>
      <InputField className='password'>
        <Label htmlFor='repeat-password'>Повторите пароль</Label>
        <InputWithButton
          register={register}
          placeholder='Введите пароль'
          option={{
            ...registerRepeatPassword,
            validate: (val: string) => {
              if (val !== watch('password')) {
                return 'Пароли не совпадают';
              }
            },
          }}
          name='repeat-password'
          type={stateRepeatPassword ? 'text' : 'password'}
          autoComplete='repeat-password'
          error={errors['repeat-password']}
          button={
            <EyeButton
              onClick={() => setStateRepeatPassword(!stateRepeatPassword)}
              shown={stateRepeatPassword}
              visible={dirtyFields['repeat-password'] && true}
            />
          }
        />
        <InputError error={errors['repeat-password']} />
      </InputField>
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid}>
        Изменить пароль
      </ButtonWithText>
    </form>
  );
};

export { ChangePassword };
