import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { OrderPreview } from '../../OrderPreview/OrderPreview';
import { Ufo } from '../../animations/Ufo/Ufo';
import { ButtonWithText, Container, TitlePage, Error } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { getUserOrders } from '../../../store/userSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { IUserState } from '../../../interfaces';
import { orders } from '../../../utils/content/profile';

import styles from './OrdersPage.module.scss';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const userOrders = useSelector((state: { user: IUserState }) => state.user.orders);

  useEffect(() => {
    setLoading(true);

    dispatch(getUserOrders())
      .unwrap()
      .then(() => {
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.orders}>
      <Container className={styles.orders_container}>
        <TitlePage type='main-title'>{orders.title}</TitlePage>
        {error && <Error>{orders.error}</Error>}
        {loading ? (
          <Ufo />
        ) : userOrders.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.ufo} />
            <span>{orders.empty}</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.grid}>
            {userOrders.map((order) => (
              <OrderPreview key={order.order_number} order={order} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export { OrdersPage };
