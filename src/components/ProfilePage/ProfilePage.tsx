import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../hooks/hooks';
import EmptyAvatarImage from '../../images/empty-avatar.svg';
import {IUserState} from '../../interfaces';
import {logOut, sendVerificationCode} from '../../store/authSlice';
import {updateStatus, updateUser} from '../../store/userSlice';
import {profileName, registerEmail} from "../../utils/registersRHF";
import {ImagePick} from '../ImagePick/ImagePick';
import {ButtonWithText, TitlePage} from '../UI';
import ProfileInput from '../UI/ProfileInput/ProfileInput';
import styles from './ProfilePage.module.scss';
import {setMessageIsOpen} from "../../store/popupSlice";


const FIRSTNAME_INPUT_LABEL = 'firstName';
const LASTNAME_INPUT_LABEL = 'lastName';
const EMAIL_INPUT_LABEL = 'email';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: { user: IUserState }) => state.user);

  const {
    register,
    getValues,
    setValue,
    formState: {
      errors,
    },
    handleSubmit,
    resetField,
    watch,
  } = useForm({
    mode: 'onBlur',
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
    // eslint-disable-next-line
  }, [user.email]);

  const firstname = getValues(FIRSTNAME_INPUT_LABEL);
  const lastname = getValues(LASTNAME_INPUT_LABEL);
  const email = getValues(EMAIL_INPUT_LABEL)

  // #TODO: Когда будет готово выпадающее меню перенести туда onLogOut!
  // eslint-disable-next-line
  const onLogOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return;
    }

    dispatch(logOut()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(updateStatus(false));
      }
    });
  };

  const onSubmit = () => {
    dispatch(updateUser({
      email: email,
      firstName: firstname,
      lastName: lastname
    })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(setMessageIsOpen({message: 'Успешно изменено', messageIsOpen: true}));
        dispatch(sendVerificationCode());
      }

      if (res.meta.requestStatus === 'rejected') {
        dispatch(setMessageIsOpen({message: 'Ошибка. Информация профиля не была изменана', messageIsOpen: true, messageIsError: true}))
      }

    });
  }

  return (
    <main className={styles.profile}>
      <TitlePage>Мои данные</TitlePage>
      <div className={styles.container}>
        <ImagePick image={EmptyAvatarImage}/>
        <div className={styles.profile_data}>
          <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
            <ProfileInput
              name={FIRSTNAME_INPUT_LABEL}
              type='text'
              placeholder='Имя'
              register={register}
              option={profileName}
              iconVisible={watch(FIRSTNAME_INPUT_LABEL)?.length}
              error={errors && errors[FIRSTNAME_INPUT_LABEL]}
              onClear={() => resetField(FIRSTNAME_INPUT_LABEL)}
            />

            <ProfileInput
              name={LASTNAME_INPUT_LABEL}
              type='text'
              placeholder='Фамилия'
              register={register}
              option={profileName}
              iconVisible={watch(LASTNAME_INPUT_LABEL)?.length}
              error={errors && errors[LASTNAME_INPUT_LABEL]}
              onClear={() => resetField(LASTNAME_INPUT_LABEL)}
            />

            <ProfileInput
              name={EMAIL_INPUT_LABEL}
              type='email'
              placeholder='Email'
              register={register}
              option={registerEmail}
              iconVisible={watch(EMAIL_INPUT_LABEL)?.length}
              error={errors && errors[EMAIL_INPUT_LABEL]}
              onClear={() => resetField(EMAIL_INPUT_LABEL)}
            />
            <ButtonWithText className={styles.button} type='submit' theme='filled'>
              Сохранить
            </ButtonWithText>
          </form>
          {
            !user.isVerified &&
            <ButtonWithText className={styles.button} onClick={() => dispatch(sendVerificationCode())}>Подтверждение
              почты</ButtonWithText>
          }
        </div>
      </div>
    </main>
  );
};

export {ProfilePage};
