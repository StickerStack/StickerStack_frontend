import { ButtonCustom } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { openOrder } from '../../store/popupSlice';
import { IOrder } from '../../interfaces/IOrder';

import styles from './OrderPreview.module.scss';

interface IProps {
  order: IOrder;
}

const OrderPreview: React.FC<IProps> = ({ order }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.order} onClick={() => dispatch(openOrder(order.id))}>
      <div className={styles.carousel} />
      <div className={styles.info}>
        <span className={styles.cost}>{order.cost} ₽</span>
        <span className={styles.amount}>{order.amount} шт</span>
        <ButtonCustom type='more' label='Опции' className={styles.button} />
        <span className={styles.status}>{order.delivery.status}</span>
      </div>
    </div>
  );
};

export { OrderPreview };
