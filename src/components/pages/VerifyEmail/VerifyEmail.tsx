import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { verifyEmail } from '../../../store/authSlice';
import { setInfoIsOpen } from '../../../store/popupSlice';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyEmail({ token: location.pathname.replace('/auth/verifyemail/', '') })).then(
      (res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/profile');
          dispatch(
            setInfoIsOpen({
              infoIsOpen: true,
              title: 'Почта подтверждена',
              text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке. ',
              buttonText: 'Начать!',
            }),
          );
        }

        if (res.meta.requestStatus === 'rejected' && res.payload === '403')
          navigate('/page-not-found');
      },
    );

    // eslint-disable-next-line
  }, []);

  return null;
};

export { VerifyEmail };
