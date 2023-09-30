import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { OrderPreview } from '@components/index';
import { Ufo } from '@components/animations/Ufo/Ufo';
import { ButtonWithText, Container, TitlePage, Error } from '@components/UI';
import { ADD_STICKERS } from '@utils/constants';
import { IUserState } from '@shared/interfaces';
import { orderspage } from '@static/profile';

import styles from './OrdersPage.module.scss';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  const { orders, ordersLoading, ordersError } = useSelector((state: { user: IUserState }) => state.user);

  return (
    <main className={styles.orders}>
      <Container className={styles.orders_container}>
        <TitlePage type='main-title'>{orderspage.title}</TitlePage>
        {ordersLoading ? (
          <Ufo />
        ) : ordersError ? (
          <Error>{orderspage.error}</Error>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.ufo} />
            <span>{orderspage.empty}</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.grid}>
            {orders.map((order) => (
              <OrderPreview key={order.order_number} order={order} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export { OrdersPage };
