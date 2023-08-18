import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import {
  Header,
  MessagePopup,
  Popup,
  ChangePasswordPage,
  MainPage,
  VerifyEmail,
  ProtectedRoute,
  PageNotFound,
  ProfilePage,
  AddStickers,
  Preloader,
  Footer,
} from '../';
import { CartPage } from '../pages/CartPage/CartPage';
import {
  PROFILE,
  POLICY,
  PAGE_404,
  ADD_STICKERS,
  CART,
  VERIFY_EMAIL,
  VERIFY_FORGOT_PASSWORD,
  ORDERS,
} from '../../utils/constants';
import { useAppDispatch } from '../../hooks/hooks';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { getUser, signInMockUser } from '../../store/userSlice';
import styles from './App.module.scss';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { PolicyPage } from '../pages/PolicyPage/PolicyPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useScrollToTop();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(signInMockUser({ email: 'my@super.user', firstName: 'Иван', lastName: 'Иванов' }));
      setIsLoading(false);
      return;
    }

    dispatch(getUser()).then(() => {
      setIsLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
            <Route path={VERIFY_FORGOT_PASSWORD} element={<ChangePasswordPage />} />
            <Route
              path={ADD_STICKERS}
              element={
                <ProtectedRoute redirectPath='/'>
                  <AddStickers />
                </ProtectedRoute>
              }
            />
            <Route
              path={CART}
              element={
                <ProtectedRoute redirectPath='/'>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={PROFILE}
              element={
                <ProtectedRoute redirectPath='/'>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ORDERS}
              element={
                <ProtectedRoute redirectPath='/'>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to={PAGE_404} />} />
            <Route path={PAGE_404} element={<PageNotFound />} />
            <Route path='/' element={<MainPage />} />
            <Route path={POLICY} element={<PolicyPage />} />
          </Routes>
          <Footer />
          <MessagePopup />
          <Popup />
        </div>
      )}
    </>
  );
};

export { App };
