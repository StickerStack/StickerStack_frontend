import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IOrder, IStickersState } from '@shared/interfaces';
import { useAppDispatch } from '@shared/hooks';
import { StickerCarousel } from '@components/index';
import { ButtonWithText } from '@components/UI';
import { CART } from '@utils/constants';
import { closePopup, openInfo, openMessage, addStickers, clearStickers, getStickers } from '@shared/store';
import { confirmCart, messages } from '@static/popups';
import { orderspage } from '@static/profile';

import image from '@images/main-page/sticker-ufo.png';
import styles from './OrderDetails.module.scss';

interface IProps {
  order: IOrder;
}

const OrderDetails: React.FC<IProps> = ({ order }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = new Date(order.created_at);
  const [loading, setLoading] = useState(false);

  const { stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);

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

  const confirmRepeat = () => {
    setLoading(true);
    dispatch(clearStickers())
      .unwrap()
      .then(() => {
        dispatch(closePopup());
        dispatch(
          addStickers(
            order.stickers.map((item) => {
              return {
                id: item.id,
                image: item.image,
                shape: item.shape,
                amount: item.amount,
                width: item.width,
                height: item.height,
                optimal_width: item.width,
                optimal_height: item.height,
                size_type: item.size_type,
              };
            }),
          ),
        )
          .then(() => {
            dispatch(closePopup());
            dispatch(getStickers());
          })
          .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })));
      })
      .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })))
      .finally(() => setLoading(false));
  };

  const onRepeat = () => {
    if (stickers.length > 1) {
      dispatch(closePopup());
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
      navigate(CART);
    } else {
      setLoading(true);
      dispatch(
        addStickers(
          order.stickers.map((item) => {
            return {
              id: item.id,
              image: item.image,
              shape: item.shape,
              amount: item.amount,
              width: item.width,
              height: item.height,
              optimal_width: item.width,
              optimal_height: item.height,
              size_type: item.size_type,
            };
          }),
        ),
      )
        .then(() => {
          dispatch(closePopup());
          navigate(CART);
          dispatch(getStickers());
        })
        .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })))
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {order && (
        <div className={styles.container}>
          <div className={styles.main}>
            <span className={styles.id}>
              {orderspage.orderId} {order.order_number}
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
                {order.stickers.reduce((acc, item) => acc + item.amount, 0)} шт на {order.number_of_sheets}{' '}
                {order.number_of_sheets.toString().endsWith('1') && !order.number_of_sheets.toString().endsWith('11')
                  ? 'листе'
                  : 'листах'}
                {order.cropping ? ' (вырезать)' : ''}
              </li>

              <li className={styles.info_item}>{orderspage.material}</li>
            </ul>
            <div className={styles.buttons}>
              <ButtonWithText theme='transparent' className={styles.button} onClick={onRepeat} loading={loading}>
                {orderspage.repeat}
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
