import { useNavigate } from 'react-router-dom';

import { IOrderState } from '../../../interfaces';
import { StickerCarousel } from '../../StickerCarousel/StickerCarousel';
import { ButtonWithText } from '../../UI';
import { CART } from '../../../utils/constants';

import styles from './OrderDetails.module.scss';

interface IProps {
  order: IOrderState;
  onClose: () => void;
}

const OrderDetails: React.FC<IProps> = ({ order, onClose }: IProps) => {
  const navigate = useNavigate();

  const date = new Date(order.created_at);

  return (
    <>
      {order && (
        <div className={styles.container}>
          <span className={styles.id}>Номер заказа: {order.order_number}</span>
          <div className={styles.content}>
            <div className={styles.carousel}>
              <StickerCarousel order={order} />
            </div>

            <div className={styles.delivery}>
              <span className={styles.current}>
                Создан {date.toLocaleDateString()} в {date.toLocaleTimeString().slice(0, 5)}
              </span>
              {/* <ul className={styles.statuses}>
                {order.delivery.statuses.map((item) => (
                  <li className={styles.status} key={item.id}>
                    <div className={styles.flex}>
                      <span className={styles.status_title}>{item.status}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
            <ul className={styles.info}>
              <li className={styles.info_item}>
                {order.stickers.reduce((acc, item) => acc + item.amount, 0)} шт на{' '}
                {order.number_of_sheets}{' '}
                {order.number_of_sheets.toString().endsWith('1') ? 'листе' : 'листах'}
              </li>
              <li className={styles.info_item}>
                {order.cropping ? 'Вырезать по контуру' : 'Оставить на листе'}
              </li>
              <li className={styles.info_item}>Белая виниловая пленка</li>
              <div className={styles.buttons}>
                <ButtonWithText
                  theme='light'
                  className={styles.button}
                  onClick={() => navigate(CART)}
                >
                  Повторить заказ
                </ButtonWithText>
                <ButtonWithText theme='light' className={styles.button} onClick={onClose}>
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
