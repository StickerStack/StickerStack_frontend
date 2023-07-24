import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonCustom } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { openOrder } from '../../store/popupSlice';
import { IOrder } from '../../interfaces/IOrder';
import { OrderOptions } from '../OrderOptions/OrderOptions';
import { StickerCarousel } from '../StickerCarousel/StickerCarousel';

import styles from './OrderPreview.module.scss';

interface IProps {
  order: IOrder;
}

const OrderPreview: React.FC<IProps> = ({ order }: IProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.order} onClick={() => dispatch(openOrder(order.id))}>
      <div className={styles.carousel}></div>
      <div className={styles.info}>
        <span className={styles.cost}>{order.cost} ₽</span>
        <span className={styles.amount}>{order.amount} шт</span>
        <ButtonCustom
          type='more'
          label='Опции'
          className={styles.button}
          onClick={() => !isOpen && setIsOpen(true)}
        />
        <span className={styles.status}>{order.delivery.status}</span>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.motion}
              initial={{
                opacity: 0,
              }}
              animate={{
                transition: {
                  duration: 0.25,
                },
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <OrderOptions setIsOpen={setIsOpen} order={order} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { OrderPreview };
