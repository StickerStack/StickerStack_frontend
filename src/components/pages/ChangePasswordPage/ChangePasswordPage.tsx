import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setFormIsOpen } from '../../../store/popupSlice';
import { ChangePassword } from '../../Popups/ChangePassword/ChangePassword';
import { useAppDispatch } from '../../../hooks/hooks';

const ChangePasswordPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem(
      'change-password-token',
      location.pathname.replace('/auth/verify-forgot-password/', ''),
    );
    if (localStorage.getItem('change-password-token')) {
      navigate('/');
      dispatch(setFormIsOpen(ChangePassword));
    }

    // eslint-disable-next-line
  }, []);

  return null;
};

export { ChangePasswordPage };
