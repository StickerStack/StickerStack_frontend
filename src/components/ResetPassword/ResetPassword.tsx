import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Transition, TransitionStatus, CSSTransition } from 'react-transition-group';
import CSS from 'csstype';

import { ButtonWithText, InputForm, TitleForm, TextForm } from '../UI';
import { Signin } from '../';

import { switchForm } from '../../store/popupSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { registerEmail } from '../../utils/registersRHF';
import { forgotPassword } from '../../store/userSlice';
import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 0,
  };

  const transitionsStyle: Partial<Record<TransitionStatus, CSS.Properties>> = {
    entering: {
      display: 'block'
    },
    entered: {
      opacity: 1,
      display: 'block'
    },
    exiting: {
      opacity: 0,
      display: 'block'
    },
    exited: {
      opacity: '0',
      display: 'none'
    }
  };

  const onSubmit = (data: FieldValues) => {
    dispatch(forgotPassword({ email: data.email })).then(() => setFormSubmit(true));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm
        register={register}
        option={registerEmail}
        error={errors?.email}
        placeholder='Введите E-mail'
        name='email'
        label='E-mail'
        type='email'
      />
      <Transition in={formSubmit} timeout={300}>
        {
          (state: TransitionStatus)=> (
            <div style={{
              ...defaultStyle,
              ...transitionsStyle[state]
              }}>Мы направим ссылку на Вашу почту для восстановления пароля</div>   
          )
        }
      </Transition>      
      <ButtonWithText type='submit'>Восстановить пароль</ButtonWithText>
      <button className={styles.button_back} onClick={() => dispatch(switchForm(Signin))}>
        <span className={styles.button_back_text}>Вернуться назад</span>
      </button>
    </form>
  );
};

export { ResetPassword };
