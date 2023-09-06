import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { verifyEmail } from '../../../store/authSlice';
import { openInfo } from '../../../store/popupSlice';
import { ADD_STICKERS, PAGE_404 } from '../../../utils/constants';
import { verified } from '../../../utils/content/popups';

import image from '../../../images/email-confirmed.png';

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
        dispatch(
          openInfo({
            title: `${verified.title}`,
            text: `${verified.text}`,
            buttonText: `${verified.buttonText}`,
            image: image,
            onClick: () => navigate(ADD_STICKERS),
          }),
        ),
      )
      .catch(() => navigate(PAGE_404));

    // eslint-disable-next-line
  }, []);

  return null;
};

export { VerifyEmail };
