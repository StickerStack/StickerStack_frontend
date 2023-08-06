import cn from 'classnames';
import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonCustom } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { openOrder } from '../../store/popupSlice';
import { IOrderState } from '../../interfaces';
import { OrderOptions } from '../OrderOptions/OrderOptions';
import { stickerWhiteBorder } from '../../utils/constants';

import styles from './OrderPreview.module.scss';

interface IProps {
  order: IOrderState;
}

const OrderPreview: React.FC<IProps> = ({ order }: IProps) => {
  const dispatch = useAppDispatch();
  // const [isOpen, setIsOpen] = useState(false);

  const firstSticker = order.stickers[0];

  return (
    <div className={styles.order} onClick={() => dispatch(openOrder(order))}>
      <div className={styles.image_box}>
        <div
          className={cn(styles.border, styles[`border_${firstSticker.shape}`])}
          style={{
            width:
              firstSticker.width / firstSticker.height >= 1
                ? '100%'
                : (firstSticker.width / firstSticker.height) * 100,
            height:
              firstSticker.height / firstSticker.width >= 1
                ? '100%'
                : (firstSticker.height / firstSticker.width) * 100,
            padding: (stickerWhiteBorder / 10 / firstSticker.width) * 100,
          }}
        >
          <img
            className={cn(styles.image, styles[`image_${firstSticker.shape}`])}
            src={`data:image/png;base64,${firstSticker.image}`}
          />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.cost}>{order.cost} ₽</span>
        <span className={styles.amount}>
          {order.stickers.reduce((acc, item) => acc + item.amount, 0)} шт
        </span>

        {/* <ButtonCustom
          type='more'
          label='Опции'
          className={styles.button}
          onClick={() => !isOpen && setIsOpen(true)}
        /> */}
        {/* <span className={styles.status}>{order.delivery.status}</span> */}

        {/* <AnimatePresence>
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
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export { OrderPreview };
