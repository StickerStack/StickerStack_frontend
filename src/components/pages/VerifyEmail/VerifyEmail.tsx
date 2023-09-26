import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { verifyEmail } from '../../../store/authSlice';
import { openInfo, openPopup } from '../../../store/popupSlice';
import { ADD_STICKERS, PAGE_404 } from '../../../utils/constants';
import { verified } from '../../../utils/content/popups';
import { useSelector } from 'react-redux';
import { IUserState } from '../../../interfaces';

import image from '../../../images/email-confirmed.png';
import { Signin } from '../../Popups/Signin/Signin';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isVerified } = useSelector((state: { user: IUserState }) => state.user);

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
            imageAbsolute: true,
            onClick: () => {
              if (isVerified) {
                navigate(ADD_STICKERS);
              } else {
                dispatch(openPopup(Signin));
              }
            },
          }),
        ),
      )
      .catch(() => navigate(PAGE_404));

    // eslint-disable-next-line
  }, []);

  return null;
};

export { VerifyEmail };
