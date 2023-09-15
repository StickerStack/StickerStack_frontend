import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IOrderState } from '../../../interfaces';
import { StickerCarousel } from '../../StickerCarousel/StickerCarousel';
import { ButtonWithText } from '../../UI';
import { ADD_STICKERS, CART } from '../../../utils/constants';
import { orders } from '../../../utils/content/profile';
import { closePopup, openInfo } from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { confirmCart } from '../../../utils/content/popups';
import { useSelector } from 'react-redux';
import { ICart } from '../../../interfaces/ICart';
import { cleanCart, clearCart } from '../../../store/cartSlice';

import image from '../../../images/main-page/sticker-ufo.png';
import styles from './OrderDetails.module.scss';

interface IProps {
  order: IOrderState;
  onClose: () => void;
}

const OrderDetails: React.FC<IProps> = ({ order, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const date = new Date(order.created_at);
  const cart = useSelector((state: { cart: ICart }) => state.cart);

  const getStatus = () => {
    switch (order.status) {
      case 'placed':
        return 'Оформлен';
    }
  };

  const confirmRepeat = () => {
    setLoading(true);
    dispatch(clearCart())
      .unwrap()
      .then(() => {
        dispatch(closePopup());
      })
      .finally(() => setLoading(false));
  };

  const onRepeat = () => {
    dispatch(closePopup());

    if (cart.items.length > 0) {
      dispatch(
        openInfo({
          title: `${confirmCart.title}`,
          text: `${confirmCart.text}`,
          buttonText: `${confirmCart.buttonText}`,
          buttonSecondText: `${confirmCart.buttonSecondText}`,
          onClick: () => confirmRepeat(),
          onClickSecond: () => dispatch(closePopup()),
          image: image,
        }),
      );
    } else {
      // здесь будет ссылка на функцию повторного добавления заказа в корзину, если она пуста
    }
    navigate(CART);
  };

  return (
    <>
      {order && (
        <div className={styles.container}>
          <div className={styles.main}>
            <span className={styles.id}>
              {orders.orderId} {order.order_number}
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
                    <span className={styles.date}>
                      {`${date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, 5)}`}
                    </span>
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
            </ul>
            <div className={styles.buttons}>
              <ButtonWithText
                theme='transparent'
                className={styles.button}
                onClick={onRepeat}
                loading={loading}
              >
                {orders.repeat}
              </ButtonWithText>
              {/* <ButtonWithText theme='transparent' className={styles.button} onClick={onClose}>
                  Удалить
                </ButtonWithText> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { OrderDetails };
