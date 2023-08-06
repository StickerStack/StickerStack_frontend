import { useNavigate } from 'react-router-dom';
import { OrderPreview } from '../../OrderPreview/OrderPreview';
import { ButtonWithText, Container, TitlePage, Error } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { getUserOrders } from '../../../store/userSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { IUserState } from '../../../interfaces';

import styles from './OrdersPage.module.scss';
import { useSelector } from 'react-redux';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const userOrders = useSelector((state: { user: IUserState }) => state.user.orders);

  useEffect(() => {
    dispatch(getUserOrders()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setError(false);
        console.log(userOrders);
        console.log(res);
      }
      if (res.meta.requestStatus === 'rejected') {
        setError(true);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.orders}>
      <Container className={styles.orders_container}>
        <TitlePage type='main-title'>Заказы</TitlePage>
        {error && <Error>Не удалось прогрузить ваши заказы</Error>}
        {userOrders.length === 0 ? (
          <div className={styles.empty}>
            <span>У вас пока нет заказов</span>
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
