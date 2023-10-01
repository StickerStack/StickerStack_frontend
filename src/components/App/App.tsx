import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, MessagePopup, Popup, ProtectedRoute, Preloader, Footer, AcceptCookies } from '../';

import {
  AddStickers,
  CartPage,
  OrdersPage,
  PolicyPage,
  ChangePasswordPage,
  VerifyEmail,
  PageNotFound,
  ProfilePage,
  MainPage,
} from '@pages/index';
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
} from '@utils/constants';
import { cookie, privacy, terms } from '@static/policy';
import { useAppDispatch, useScrollToTop } from '@shared/hooks';
import { countTotal, updateSheets, getUser, getUserOrders, signInMockUser, getStickers } from '@shared/store';
import { IUserState, IStickersState } from '@shared/interfaces';

import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const { pages, stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);

  // Скролл к началу страницы при смене роута
  useScrollToTop();

  // Получение параметров пользователя, либо мокового пользователя
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

  // Получение всех стикеров корзины и истории заказов
  useEffect(() => {
    isLogged && dispatch(getStickers());
    dispatch(getUserOrders());
    // eslint-disable-next-line
  }, [isLogged]);

  // Обновление и подсчет листов
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
