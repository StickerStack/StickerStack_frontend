import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Header,
  MessagePopup,
  Popup,
  ChangePassword,
  MainPage,
  VerifyEmail,
  ProtectedRoute,
  PageNotFound,
  ProfilePage,
  AddStickers,
  Preloader
} from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { getUser } from '../../store/userSlice';
import { IUserState } from '../../interfaces/IUserState';
import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useSelector(
    (state: { user: IUserState }) => state.user.isLogged
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getUser()).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.app}>
          <div id='app-popup' />
          <Header />
          <Routes>
            <Route path='/auth/verifyemail' element={<VerifyEmail />} />
            <Route
              path='/auth/verify-forgot-password/:token'
              element={<ChangePassword />}
            />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route
              path='/add-stickers'
              element={
                <ProtectedRoute isLogged={isLogged} redirectPath='/'>
                  <AddStickers />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute isLogged={isLogged} redirectPath='/'>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to={'/page-not-found'} />} />
            <Route path='/page-not-found' element={<PageNotFound />} />
            <Route path='/' element={<MainPage />} />
          </Routes>
          <MessagePopup />
          <Popup />
        </div>
      )}
    </>
  );
};

export { App };
