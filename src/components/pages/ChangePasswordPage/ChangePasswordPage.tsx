import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { openPopup } from '@shared/store';
import { ChangePassword } from '@components/Popups';
import { useAppDispatch } from '@shared/hooks';

const ChangePasswordPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('change-password-token', location.pathname.replace('/auth/verify-forgot-password/', ''));
    if (localStorage.getItem('change-password-token')) {
      navigate('/');
      dispatch(openPopup(ChangePassword));
    }

    // eslint-disable-next-line
  });

  return null;
};

export { ChangePasswordPage };
