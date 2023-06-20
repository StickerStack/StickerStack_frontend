import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../hooks/hooks';
import { IUserState } from '../../../interfaces';
import { sendVerificationCode } from '../../../store/authSlice';
import { deleteProfileImage, updateProfileImage, updateUser } from '../../../store/userSlice';
import { profileName, registerEmail } from '../../../utils/registersRHF';
import { ImagePick } from '../../ImagePick/ImagePick';
import { ButtonWithText, Container, TitlePage } from '../../UI';
import { setMessageIsOpen } from '../../../store/popupSlice';
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
  const dispatch = useAppDispatch();
  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];
  const [image, setImage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const reader = new FileReader();
      const data = new FormData();
      reader.readAsDataURL(files[0]);

      reader.onloadend = () => {
        const file = files[0];
        data.append('file', file, 'avatar.png');
        dispatch(updateProfileImage(data));
        console.log(data);
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };
    }
  };

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    resetField,
    watch,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user.avatar) {
      setImage(user.avatar);
    }

    if (user.email) {
      setValue(EMAIL_INPUT_LABEL, user.email);
    }

    if (user.firstName) {
      setValue(FIRSTNAME_INPUT_LABEL, user.firstName);
    }

    if (user.lastName) {
      setValue(LASTNAME_INPUT_LABEL, user.lastName);
    }
    // eslint-disable-next-line
  }, [user.email]);

  const firstname = getValues(FIRSTNAME_INPUT_LABEL);
  const lastname = getValues(LASTNAME_INPUT_LABEL);
  const email = getValues(EMAIL_INPUT_LABEL);

  const onSubmit = () => {
    const emailChanged = user.email !== email;
    dispatch(
      updateUser({
        email: email,
        firstName: firstname,
        lastName: lastname,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(setMessageIsOpen({ message: 'Успешно изменено', messageIsOpen: true }));
        if (emailChanged) {
          dispatch(sendVerificationCode());
        }
      }

      if (res.meta.requestStatus === 'rejected') {
        dispatch(
          setMessageIsOpen({
            message: 'Ошибка. Информация профиля не изменана',
            messageIsOpen: true,
            messageIsError: true,
          })
        );
      }
    });
  };

  return (
    <main className={styles.profile}>
      <Container className={styles.profile_container}>
        <TitlePage>Мои данные</TitlePage>
        <section className={styles.section}>
          <ImagePick
            onLoadImage={handleImageChange}
            deleteImage={() => {
              dispatch(deleteProfileImage());
              setImage('');
            }}
            image={image ? image : EmptyAvatarImage}
          />
          <div className={styles.profile_data}>
            <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
              <InputField>
                <InputWithButton
                  register={register}
                  option={profileName}
                  name={FIRSTNAME_INPUT_LABEL}
                  error={errors[FIRSTNAME_INPUT_LABEL]}
                  placeholder='Имя'
                  className='profile'
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(FIRSTNAME_INPUT_LABEL, '')}
                      className={styles.remove}
                    />
                  }
                />
                <InputError error={errors[FIRSTNAME_INPUT_LABEL]} />
              </InputField>
              <InputField>
                <InputWithButton
                  register={register}
                  option={profileName}
                  name={LASTNAME_INPUT_LABEL}
                  placeholder='Фамилия'
                  className='profile'
                  error={errors[LASTNAME_INPUT_LABEL]}
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(LASTNAME_INPUT_LABEL, '')}
                      className={styles.remove}
                    />
                  }
                />
                <InputError error={errors[LASTNAME_INPUT_LABEL]} />
              </InputField>
              <InputField>
                <InputWithButton
                  register={register}
                  option={registerEmail}
                  error={errors[EMAIL_INPUT_LABEL]}
                  name={EMAIL_INPUT_LABEL}
                  placeholder='Email'
                  className='profile'
                  button={
                    <button
                      type='button'
                      onClick={() => setValue(EMAIL_INPUT_LABEL, '')}
                      className={styles.remove}
                    />
                  }
                />
                <InputError error={errors[EMAIL_INPUT_LABEL]} />
              </InputField>

              <ButtonWithText
                className={styles.button}
                type='submit'
                disabled={
                  !(user.firstName !== firstname || user.lastName !== lastname || user.email !== email) ||
                  !isValid
                }
              >
                Сохранить
              </ButtonWithText>
            </form>
            {!user.isVerified && (
              <>
                <p>Не пришло письмо подтверждения электронной почты? Жми кнопку!</p>
                <ButtonWithText
                  className={styles.button}
                  theme='transparent'
                  onClick={() => dispatch(sendVerificationCode())}
                >
                  Выслать повторно
                </ButtonWithText>
              </>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};

export { ProfilePage };
