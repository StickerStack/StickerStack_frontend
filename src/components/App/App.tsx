import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

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
  PRIVACY,
  TERMS,
  PAGE_404,
  ADD_STICKERS,
  CART,
  VERIFY_EMAIL,
  VERIFY_FORGOT_PASSWORD,
  ORDERS,
  privacy,
  terms,
} from '../../utils/constants';
import { useAppDispatch } from '../../hooks/hooks';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { PolicyPage } from '../pages/PolicyPage/PolicyPage';
import { addSticker, getCart } from '../../store/cartSlice';
import { getUser, signInMockUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { setCardsFromCart } from '../../store/cardsSlice';
import { ICart } from '../../interfaces/ICart';
import { ICardsState, IUserState } from '../../interfaces';

import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const { items } = useSelector((state: { cart: ICart }) => state.cart);

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
    isLogged &&
      dispatch(getCart()).then((res) => {
        console.log(res);
      });
    // eslint-disable-next-line
  }, [location, isLogged]);

  useEffect(() => {
    if (items.length !== 0) {
      dispatch(setCardsFromCart(items));
    }
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    isLogged &&
      items.length !== 0 &&
      cards.forEach((card) => {
        const added = items.find((item) => item.id === card.id);

        !added &&
          dispatch(
            addSticker({
              amount: card.amount,
              image: card.image.startsWith('data:image/png;base64,')
                ? card.image.replace('data:image/png;base64,', '')
                : card.image.startsWith('data:image/jpeg;base64,')
                ? card.image.replace('data:image/jpeg;base64,', '')
                : card.image.startsWith('data:image/jpg;base64,')
                ? card.image.replace('data:image/jpg;base64,', '')
                : '',
              shape: card.shape,
              height: card.size.height,
              width: card.size.width,
            }),
          );
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
