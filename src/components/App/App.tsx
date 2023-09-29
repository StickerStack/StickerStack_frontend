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
import { AddStickersNew } from '@pages/AddStickers/AddStickers';
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
import { cookie, privacy, terms } from '../../assets/static/policy';
import { useAppDispatch } from '../../shared/hooks/hooks';
import { useScrollToTop } from '../../shared/hooks/useScrollToTop';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { PolicyPage } from '../pages/PolicyPage/PolicyPage';
import { countTotal, updateSheets } from '../../shared/store/cartSlice';
import { getUser, getUserOrders, signInMockUser } from '../../shared/store/userSlice';
import { IUserState } from '../../shared/interfaces';
import { AcceptCookies } from '../AcceptCookies/AcceptCookies';
import { getStickers } from '../../shared/store/stickersSlice';
import { IStickersState } from '../../shared/interfaces/IStickersState';

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
