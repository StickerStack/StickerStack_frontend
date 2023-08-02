import { IOrderState } from '../../../interfaces/IOrderState';
import { orders } from '../../../utils/constants';
import { StickerCarousel } from '../../StickerCarousel/StickerCarousel';
import { ButtonWithText } from '../../UI';

import styles from './OrderDetails.module.scss';

interface IProps {
  order: IOrderState;
}

const OrderDetails: React.FC<IProps> = ({ order }: IProps) => {
  return (
    <>
      {order && (
        <div className={styles.container}>
          <span className={styles.id}>Номер заказа: {order.id}</span>
          <div className={styles.content}>
            <div className={styles.carousel}>
              <StickerCarousel order={order} />
            </div>
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
              <li className={styles.info_item}>Белая виниловая пленка</li>
              <div className={styles.buttons}>
                <ButtonWithText theme='light' className={styles.button}>
                  Повторить заказ
                </ButtonWithText>
                <ButtonWithText theme='light' className={styles.button}>
                  Удалить
                </ButtonWithText>
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export { OrderDetails };
