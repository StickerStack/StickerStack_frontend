import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  ButtonWithText,
  TitlePopup,
  EyeButton,
  Label,
  InputError,
  InputWithButton,
  InputField,
} from '../../UI';

import { closePopup, openInfo, openMessage } from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { resetPassword } from '../../../store/authSlice';
import { registerPassword, registerRepeatPassword } from '../../../utils/registersRHF';
import { ADD_STICKERS, getRandomNumber } from '../../../utils/constants';

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
  const [loading, setLoading] = useState(false);

  const onSubmit = (formData: FieldValues) => {
    setLoading(true);
    dispatch(resetPassword({ token: token, password: formData.password }))
      .unwrap()
      .then(() => {
        dispatch(closePopup());
        const randomNumber = getRandomNumber(1, 3);
        dispatch(
          openInfo({
            title: 'Пароль изменен',
            text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке.',
            buttonText: 'Перейти к заказу',
            onClick: () => navigate(ADD_STICKERS),
            image: require(`../../../images/password-changed-${randomNumber}.png`),
          }),
        );
        localStorage.removeItem('change-password-token');
      })
      .catch((err) => {
        if (err.message === '422') {
          dispatch(
            openMessage({
              text: 'Ошибка при заполнении полей. Попробуйте поменять значения.',
              isError: true,
            }),
          );
        } else if (err) {
          dispatch(
            openMessage({
              text: 'Что-то пошло не так. Попробуйте еще раз.',
              isError: true,
            }),
          );
        }
      })
      .finally(() => setLoading(false));
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
          className={watch('password') !== '' && !statePassword ? styles.password : ''}
          autoComplete='current-password'
          error={errors.password}
          button={
            <EyeButton
              onClick={() => setStatePasswod(!statePassword)}
              shown={statePassword}
              visible={dirtyFields?.password && watch('password') !== '' && true}
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
          className={watch('repeat-password') !== '' && !stateRepeatPassword ? styles.password : ''}
          autoComplete='repeat-password'
          error={errors['repeat-password']}
          button={
            <EyeButton
              onClick={() => setStateRepeatPassword(!stateRepeatPassword)}
              shown={stateRepeatPassword}
              visible={dirtyFields['repeat-password'] && watch('repeat-password') !== '' && true}
            />
          }
        />
        <InputError error={errors['repeat-password']} />
      </InputField>
      <ButtonWithText type='submit' className={styles.button} disabled={!isValid} loading={loading}>
        Изменить пароль
      </ButtonWithText>
    </form>
  );
};

export { ChangePassword };
