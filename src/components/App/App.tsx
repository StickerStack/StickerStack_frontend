import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  Preloader,
  Footer,
} from '../';
import { AddStickersNew } from '../pages/AddStickers/AddStickers';
import { CartPage } from '../pages/CartPage/CartPage';
import {
  PROFILE,
  PRIVACY,
  TERMS,
  PAGE_404,
  ADD_STICKERS,
  CART,
  VERIFY_EMAIL,
  VERIFY_FORGOT_PASSWORD,
  ORDERS,
  COOKIE,
} from '../../utils/constants';
import { cookie, privacy, terms } from '../../utils/content/policy';
import { useAppDispatch } from '../../hooks/hooks';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { PolicyPage } from '../pages/PolicyPage/PolicyPage';
import { countTotal, updateSheets } from '../../store/cartSlice';
import { getUser, signInMockUser } from '../../store/userSlice';
import { IUserState } from '../../interfaces';
import { AcceptCookies } from '../AcceptCookies/AcceptCookies';

import styles from './App.module.scss';
import { getStickers } from '../../store/stickersSlice';
import { IStickersState } from '../../interfaces/IStickersState';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const { pages, stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);

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

  useEffect(() => {
    isLogged && dispatch(getStickers());
    // eslint-disable-next-line
  }, [location, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(updateSheets(pages.length));
      dispatch(countTotal(stickers.slice(0, stickers.length - 1)));
    }
    // eslint-disable-next-line
  }, [pages]);

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
                  <AddStickersNew />
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
            <Route path={PRIVACY} element={<PolicyPage policy={privacy} />} />
            <Route path={TERMS} element={<PolicyPage policy={terms} />} />
            <Route path={COOKIE} element={<PolicyPage policy={cookie} />} />
          </Routes>
          <Footer />
          <MessagePopup />
          <Popup />
          <AcceptCookies />
        </div>
      )}
    </>
  );
};

export { App };
