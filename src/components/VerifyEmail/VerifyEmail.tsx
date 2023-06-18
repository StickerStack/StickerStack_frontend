import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ButtonWithText, TitlePopup, TextForm } from '../UI';
import { Preloader } from '../Preloader/Preloader';
import { useAppDispatch } from '../../hooks/hooks';
import { verifyEmail } from '../../store/authSlice';
import { setInfoIsOpen } from '../../store/popupSlice';

import styles from './VerifyEmail.module.scss';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(verifyEmail({ token: location.pathname.replace('/auth/verifyemail/', '') }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') navigate('/');
        dispatch(
          setInfoIsOpen({
            infoIsOpen: true,
            title: 'Почта подтверждена',
            text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке. ',
            buttonText: 'Начать!',
          }),
        );

        if (res.meta.requestStatus === 'rejected' && res.payload === '403')
          navigate('/page-not-found');
      })
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.verify}>
          <TitlePopup>Почта успешно подтверждена</TitlePopup>
          <TextForm>Теперь вам доступен полный функционал для создания стикеров!</TextForm>
          <ButtonWithText type='button' onClick={() => navigate('/add-stickers')}>
            Начать!
          </ButtonWithText>
        </div>
      )} */}
    </>
  );
};

export { VerifyEmail };
