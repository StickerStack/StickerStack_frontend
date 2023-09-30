import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@shared/hooks';
import { verifyEmail, openInfo, openPopup, getUser } from '@shared/store';
import { ADD_STICKERS, PAGE_404, PROFILE } from '@utils/constants';
import { IUserState } from '@shared/interfaces';
import { verified } from '@static/popups';
import { Signin } from '@/components/Popups';

import image from '@images/email-confirmed.png';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isLogged } = useSelector((state: { user: IUserState }) => state.user);

  useEffect(() => {
    dispatch(verifyEmail({ token: location.pathname.replace('/auth/verifyemail/', '') }))
      .then(() => {
        dispatch(getUser());
        navigate(PROFILE);
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
              if (isLogged) {
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
