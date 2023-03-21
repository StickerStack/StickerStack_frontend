import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, MessagePopup, Popup, ChangePassword, MainPage } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { getUser } from '../../store/userSlice';
import { ProfilePage } from '../ProfilePage/ProfilePage';
import { IUserState } from '../../interfaces/IUserState';
import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <div id='app-popup' />
      <Header />
      <Routes>
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/profile' element={isLogged ? <ProfilePage /> : <Navigate to='/' />} />
        <Route path='/' element={<MainPage />} />
      </Routes>

      <MessagePopup />
      <Popup />
    </div>
  );
};

export { App };
