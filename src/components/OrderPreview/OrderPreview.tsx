import cn from 'classnames';

import { useAppDispatch } from '../../hooks/hooks';
import { useResize } from '../../hooks/useResize';
import { openOrder } from '../../store/popupSlice';
import { IOrder } from '../../interfaces';
import { StickerImage } from '../StickerImage/StickerImage';

import styles from './OrderPreview.module.scss';

interface IProps {
  order: IOrder;
}

const OrderPreview: React.FC<IProps> = ({ order }: IProps) => {
  const dispatch = useAppDispatch();
  const width = useResize();
  // const [isOpen, setIsOpen] = useState(false);

  const getStatus = () => {
    switch (order.status) {
      case 'placed':
        return 'Оформлен';
      case 'cancelled':
        return 'Отменен';
      case 'preparing':
        return 'В печати';
      case 'ready for pickup':
        return 'Готов к выдаче';
      case 'completed':
        return 'Завершен';
    }
  };

  const firstSticker = order.stickers[0];

  return (
    <div className={styles.order} onClick={() => dispatch(openOrder(order))}>
      <div className={styles.image_box}>
        <StickerImage
          sticker={firstSticker}
          boxWidth={width > 455 ? 180 : 130}
          boxHeight={width > 455 ? 180 : 130}
          shadow={false}
        />
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
        <span className={styles.status}>{getStatus()}</span>

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
