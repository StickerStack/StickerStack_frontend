import { useNavigate } from 'react-router-dom';
import { OrderPreview } from '../../OrderPreview/OrderPreview';
import { ButtonWithText, Container, TitlePage } from '../../UI';
import { ADD_STICKERS, orders } from '../../../utils/constants';

import styles from './OrdersPage.module.scss';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.orders}>
      <Container className={styles.orders_container}>
        <TitlePage type='main-title'>Заказы</TitlePage>
        {orders.length === 0 ? (
          <div className={styles.empty}>
            <span>У вас пока нет заказов</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.grid}>
            {orders.map((order) => (
              <OrderPreview key={order.id} order={order} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export { OrdersPage };
