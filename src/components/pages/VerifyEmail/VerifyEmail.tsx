import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { verifyEmail } from '../../../store/authSlice';
import { openInfo } from '../../../store/popupSlice';

import image from '../../../images/email-confirmed.png';
import { ADD_STICKERS, PAGE_404 } from '../../../utils/constants';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyEmail({ token: location.pathname.replace('/auth/verifyemail/', '') }))
      .then(() => {
        navigate('/');
      })
      .then(() =>
        setTimeout(
          () =>
            dispatch(
              openInfo({
                title: 'Почта подтверждена',
                text: 'Сделай свои вещи уникальными с помощью стикеров на виниловой пленке.',
                buttonText: 'Перейти к заказу',
                onClick: () => navigate(ADD_STICKERS),
                image: image,
              }),
            ),
          1000,
        ),
      )
      .catch(() => navigate(PAGE_404));

    // eslint-disable-next-line
  }, []);

  return null;
};

export { VerifyEmail };
