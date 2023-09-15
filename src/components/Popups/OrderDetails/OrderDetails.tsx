import { useNavigate } from 'react-router-dom';

import { IOrder } from '../../../interfaces';
import { StickerCarousel } from '../../StickerCarousel/StickerCarousel';
import { ButtonWithText } from '../../UI';
import { CART } from '../../../utils/constants';
import { orders } from '../../../utils/content/profile';

import styles from './OrderDetails.module.scss';

interface IProps {
  order: IOrder;
  // onClose: () => void; -- Нам это нужно? 
} 

const OrderDetails: React.FC<IProps> = ({ order }: IProps) => {
  const navigate = useNavigate();
  const date = new Date(order.created_at);

  const getStatus = () => {
    switch (order.status) {
      case 'placed':
        return 'Оформлен';
    }
  };

  return (
    <>
      {order && (
        <div className={styles.container}>
          <div className={styles.main}>
            <span className={styles.id}>
              {orders.orderId} {order.order_number}
            </span>
            <span className={styles.current}>
              Создан {date.toLocaleDateString()} в {date.toLocaleTimeString().slice(0, 5)}
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.carousel}>
              <StickerCarousel order={order} />
            </div>
            <div className={styles.delivery}>
              <span className={styles.current}>{getStatus()}</span>
              <ul className={styles.statuses}>
                {/* {order.delivery.statuses.map((item) => ( */}
                <li className={styles.status}>
                  <div className={styles.flex}>
                    <span className={styles.status_title}>Оформлен</span>
                    <span className={styles.date}>{date.toLocaleDateString()}</span>
                  </div>
                </li>
                {/* ))} */}
              </ul>
            </div>
            <ul className={styles.info}>
              <li className={styles.info_item}>
                {order.stickers.reduce((acc, item) => acc + item.amount, 0)} шт на{' '}
                {order.number_of_sheets}{' '}
                {order.number_of_sheets.toString().endsWith('1') &&
                !order.number_of_sheets.toString().endsWith('11')
                  ? 'листе'
                  : 'листах'}
              </li>
              <li className={styles.info_item}>
                {order.cropping ? 'Вырезать по контуру' : 'Оставить на листе'}
              </li>
              <li className={styles.info_item}>{orders.material}</li>
              <div className={styles.buttons}>
                <ButtonWithText
                  theme='transparent'
                  className={styles.button}
                  onClick={() => navigate(CART)}
                >
                  {orders.repeat}
                </ButtonWithText>
                {/* <ButtonWithText theme='transparent' className={styles.button} onClick={onClose}>
                  Удалить
                </ButtonWithText> */}
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export { OrderDetails };
