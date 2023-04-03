import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, MessagePopup, Popup, ChangePassword, MainPage, VerifyEmail } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import { getUser } from '../../store/userSlice';
import { ProfilePage } from '../ProfilePage/ProfilePage';
import { AddStickers } from '../AddStickers/AddStickers';
import { PageNotFound } from '../PageNotFound/PageNotFound';
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
        <Route path='/' element={<MainPage />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/add-stickers' element={isLogged ? <AddStickers /> : <Navigate to='/' />} />
        <Route path='/profile' element={isLogged ? <ProfilePage /> : <Navigate to='/' />} />
        <Route path='/auth/verifyemail' element={<VerifyEmail />} />
        <Route path='/auth/verify-forgot-password/:token' element={<ChangePassword />} />
        <Route path='*' element={<Navigate to={'/page-not-found'} />} />
        <Route path='/page-not-found' element={<PageNotFound />} />
      </Routes>
      <MessagePopup />
      <Popup />
    </div>
  );
};

export { App };
