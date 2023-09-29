import { useCallback } from 'react';

import { TextUnderline } from '../UI';
import { useAppDispatch } from '../../shared/hooks/hooks';
import { useOutsideClick } from '../../shared/hooks/useOutsideClick';
import { openOrder } from '../../shared/store/popupSlice';
import { IOrder } from '../../shared/interfaces';

import styles from './OrderOptions.module.scss';

interface IProps {
  setIsOpen: (open: boolean) => void;
  order: IOrder;
}

const OrderOptions: React.FC<IProps> = ({ order, setIsOpen }: IProps) => {
  const dispatch = useAppDispatch();

  const ref = useOutsideClick(
    useCallback(() => {
      setTimeout(() => setIsOpen(false), 100);
    }, []),
  );
  return (
    <div className={styles.options} ref={ref}>
      <TextUnderline
        className={styles.button}
        onClick={() => {
          order && dispatch(openOrder(order));
          setIsOpen(false);
        }}
      >
        Просмотр заказа
      </TextUnderline>
      <TextUnderline onClick={() => setIsOpen(false)} className={styles.button}>
        Повторить заказ
      </TextUnderline>
      <TextUnderline onClick={() => setIsOpen(false)} className={styles.button}>
        Удалить
      </TextUnderline>
    </div>
  );
};

export { OrderOptions };
