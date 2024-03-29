import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { useAppDispatch } from '@shared/hooks';
import { IUserState } from '@shared/interfaces';
import { sendVerificationCode, openInfo, openMessage, updateUser } from '@shared/store';
import { profileName, registerEmail } from '@utils/registersRHF';
import { ImagePick } from '@components/index';
import {
  ButtonWithText,
  Container,
  InputWithButton,
  InputField,
  InputError,
  TextUnderline,
  TitlePage,
} from '@components/UI';
import { getRandomNumber } from '@utils/constants';
import { profile } from '@static/profile';
import { messages, verifyChanged, verifyPlease } from '@static/popups';

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

  const fieldsUnchanged = user.firstName === firstname && user.lastName === lastname && user.email === email;
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
      .unwrap()
      .then(() => {
        dispatch(openMessage({ text: `${messages.success}`, isError: false }));
        if (emailChanged) {
          dispatch(sendVerificationCode())
            .then(() => {
              const randomNumber = getRandomNumber(1, 3);
              dispatch(
                openInfo({
                  title: `${verifyChanged.title}`,
                  text: `${verifyChanged.text}`,
                  buttonText: `${verifyChanged.buttonText}`,
                  image: require(`../../../images/check-your-mail-${randomNumber}.png`),
                }),
              );
            })
            .catch(() =>
              dispatch(
                openMessage({
                  text: `${messages.somethingWrong}`,
                  isError: true,
                }),
              ),
            );
        }
      })
      .catch((err) => {
        if (err.message === '422') {
          dispatch(
            openMessage({
              text: `${messages.fieldsError}`,
              isError: true,
            }),
          );
        } else if (err) {
          dispatch(
            openMessage({
              text: `${messages.somethingWrong}`,
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
        <TitlePage type='main-title'>{profile.title}</TitlePage>
        <section className={styles.section}>
          <ImagePick />
          <div className={styles.profile_data}>
            <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
              <InputField>
                <InputWithButton
                  register={register}
                  option={{
                    ...profileName,
                    onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                      setValue('firstName', value.target.value.trim());
                      setValue('firstName', value.target.value[0].toUpperCase() + value.target.value.slice(1));
                    },
                  }}
                  name={FIRSTNAME_INPUT_LABEL}
                  error={errors[FIRSTNAME_INPUT_LABEL]}
                  placeholder={profile.namePlaceholder}
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
                      setValue('lastName', value.target.value[0].toUpperCase() + value.target.value.slice(1));
                    },
                  }}
                  name={LASTNAME_INPUT_LABEL}
                  placeholder={profile.lastNamePlaceholder}
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
                  placeholder={profile.emailPlaceholder}
                  className='profile'
                />
                <InputError error={errors[EMAIL_INPUT_LABEL]} />
              </InputField>
              <ButtonWithText
                className={styles.button}
                type='submit'
                disabled={(fieldsUnchanged && validOrInvalid) || !isValid}
                loading={loading}
              >
                {profile.button}
              </ButtonWithText>
            </form>
            {!user.isVerified && (
              <div className={styles.additional}>
                <span className={styles.additional_text}>{profile.link.label}</span>
                <TextUnderline
                  className={styles.underline}
                  onClick={() => {
                    dispatch(sendVerificationCode())
                      .then(() => {
                        const randomNumber = getRandomNumber(1, 3);
                        dispatch(
                          openInfo({
                            title: `${verifyPlease.title}`,
                            text: `${verifyPlease.text}`,
                            buttonText: `${verifyPlease.buttonText}`,
                            image: require(`../../../images/check-your-mail-${randomNumber}.png`),
                          }),
                        );
                      })
                      .catch(() =>
                        dispatch(
                          openMessage({
                            text: `${messages.somethingWrong}`,
                            isError: true,
                          }),
                        ),
                      );
                  }}
                >
                  {profile.link.text}
                </TextUnderline>
              </div>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};

export { ProfilePage };
