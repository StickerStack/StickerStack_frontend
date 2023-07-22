import { OrderPreview } from '../../OrderPreview/OrderPreview';
import { Container, TitlePage } from '../../UI';
import { orders } from '../../../utils/constants';

import styles from './OrdersPage.module.scss';

const OrdersPage: React.FC = () => {
  return (
    <main className={styles.orders}>
      <Container className={styles.orders_container}>
        <TitlePage type='main-title'>Заказы</TitlePage>
        <div className={styles.grid}>
          {orders.map((order) => (
            <OrderPreview key={order.id} order={order} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export { OrdersPage };
