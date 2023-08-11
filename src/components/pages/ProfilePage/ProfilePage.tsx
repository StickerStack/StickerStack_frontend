import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { useAppDispatch } from '../../../hooks/hooks';
import { IUserState } from '../../../interfaces';
import { sendVerificationCode } from '../../../store/authSlice';
import { openMessage } from '../../../store/popupSlice';
import { updateUser } from '../../../store/userSlice';
import { profileName, registerEmail } from '../../../utils/registersRHF';
import { ImagePick } from '../../ImagePick/ImagePick';
import { ButtonWithText, Container, TextUnderline, TitlePage } from '../../UI';
import { InputWithButton } from '../../UI/InputWithButton/InputWithButton';
import { InputField } from '../../UI/InputField/InputField';
import { InputError } from '../../UI/InputError/InputError';

import EmptyAvatarImage from '../../../images/empty-avatar.svg';
import styles from './ProfilePage.module.scss';

const FIRSTNAME_INPUT_LABEL = 'firstName';
const LASTNAME_INPUT_LABEL = 'lastName';
const EMAIL_INPUT_LABEL = 'email';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: { user: IUserState }) => state.user);
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.email) {
      setValue(EMAIL_INPUT_LABEL, user.email);
    }

    if (user.firstName) {
      setValue(FIRSTNAME_INPUT_LABEL, user.firstName);
    }

    if (user.lastName) {
      setValue(LASTNAME_INPUT_LABEL, user.lastName);
    }
    if (email === '') {
      setValue(EMAIL_INPUT_LABEL, email);
    }
    // eslint-disable-next-line
  }, [user.email]);

  const firstname = watch(FIRSTNAME_INPUT_LABEL);
  const lastname = watch(LASTNAME_INPUT_LABEL);
  const email = watch(EMAIL_INPUT_LABEL);

  const fieldsUnchanged =
    user.firstName === firstname && user.lastName === lastname && user.email === email;
  const validOrInvalid = isValid || !isValid;

  const onSubmit = () => {
    const emailChanged = user.email !== email;
    setLoading(true);
    dispatch(
      updateUser({
        email: email,
        firstName: firstname,
        lastName: lastname,
      }),
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(openMessage({ text: 'Успешно изменено', isError: false }));
          if (emailChanged) {
            dispatch(sendVerificationCode());
          }
        }

        if (res.meta.requestStatus === 'rejected') {
          dispatch(
            openMessage({
              text: 'Ошибка. Информация профиля не изменана',
              isError: true,
            }),
          );
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className={styles.profile}>
      <Container className={styles.profile_container}>
        <TitlePage type='main-title'>Мои данные</TitlePage>
        <section className={styles.section}>
          <ImagePick image={EmptyAvatarImage} />
          <div className={styles.profile_data}>
            <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
              <InputField>
                <InputWithButton
                  register={register}
                  option={{
                    ...profileName,
                    onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                      setValue('firstName', value.target.value.trim());
                      setValue(
                        'firstName',
                        value.target.value[0].toUpperCase() + value.target.value.slice(1),
                      );
                    },
                  }}
                  name={FIRSTNAME_INPUT_LABEL}
                  error={errors[FIRSTNAME_INPUT_LABEL]}
                  placeholder='Имя'
                  className='profile'
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(FIRSTNAME_INPUT_LABEL, '')}
                      className={cn(styles.remove, !firstname && styles.remove_none)}
                    />
                  }
                />
                <InputError error={errors[FIRSTNAME_INPUT_LABEL]} />
              </InputField>
              <InputField>
                <InputWithButton
                  register={register}
                  option={{
                    ...profileName,
                    onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                      setValue('lastName', value.target.value.trim());
                      setValue(
                        'lastName',
                        value.target.value[0].toUpperCase() + value.target.value.slice(1),
                      );
                    },
                  }}
                  name={LASTNAME_INPUT_LABEL}
                  placeholder='Фамилия'
                  className='profile'
                  error={errors[LASTNAME_INPUT_LABEL]}
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(LASTNAME_INPUT_LABEL, '')}
                      className={cn(styles.remove, !lastname && styles.remove_none)}
                    />
                  }
                />
                <InputError error={errors[LASTNAME_INPUT_LABEL]} />
              </InputField>
              <InputField>
                <InputWithButton
                  register={register}
                  option={{
                    ...registerEmail,
                    onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                      setValue('email', value.target.value.trim());
                    },
                  }}
                  error={errors[EMAIL_INPUT_LABEL]}
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(EMAIL_INPUT_LABEL, '')}
                      className={cn(styles.remove, !email && styles.remove_none)}
                    />
                  }
                  name={EMAIL_INPUT_LABEL}
                  placeholder='Электронная почта'
                  className='profile'
                />
                <InputError error={errors[EMAIL_INPUT_LABEL]} />
              </InputField>

              <ButtonWithText
                className={styles.button}
                type='submit'
                disabled={(fieldsUnchanged && validOrInvalid) || !isValid}
              >
                Сохранить
              </ButtonWithText>
            </form>
            {!user.isVerified && (
              <>
                <p>Не пришло письмо подтверждения электронной почты?</p>
                <TextUnderline
                  className={styles.underline}
                  onClick={() => dispatch(sendVerificationCode())}
                >
                  Выслать повторно
                </TextUnderline>
              </>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};

export { ProfilePage };
