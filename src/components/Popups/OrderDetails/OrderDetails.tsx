import { IOrder } from '../../../interfaces/IOrder';
import { orders } from '../../../utils/constants';

import styles from './OrderDetails.module.scss';

interface IProps {
  id: number;
}

const OrderDetails: React.FC<IProps> = ({ id }: IProps) => {
  const order = orders.find((o: IOrder) => {
    o.id = id;
    return o;
  });

  return (
    <>
      {order && (
        <div className={styles.container}>
          <span className={styles.id}>Номер заказа: {order.id}</span>
          <div className={styles.content}>
            <div className={styles.carousel} />
            <div className={styles.delivery}>
              <span className={styles.current}>{order.delivery.status}</span>
              <ul className={styles.statuses}>
                {order.delivery.statuses.map((item) => (
                  <li className={styles.status} key={item.id}>
                    <div className={styles.flex}>
                      <span className={styles.status_title}>{item.status}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={styles.info}>
              <li className={styles.info_item}>
                {order.amount} шт на {order.number_of_sheets} листах
              </li>
              <li className={styles.info_item}>2 см х 3 см</li>
              <li className={styles.info_item}>Белая виниловая пленка</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export { OrderDetails };
