import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../hooks/hooks';
import { StickerList } from '../../StickerList/StickerList';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { ButtonWithText, TooltipCustom } from '../../UI';
import { IStickersState } from '../../../interfaces/IStickersState';
import { settings } from './settings';
import { messages, orderPlaced, previewShow } from '../../../utils/content/popups';
import { closePopup, openInfo, openMessage } from '../../../store/popupSlice';
import { ADD_STICKERS, CART, ORDERS } from '../../../utils/constants';
import { uploadOrder } from '../../../store/cartSlice';
import { removeAllStickers } from '../../../store/stickersSlice';
import { ICart } from '../../../interfaces/ICart';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../../../images/cart-dog.png';
import styles from './PopupPreview.module.scss';

const PopupPreview: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pages } = useSelector((state: { stickers: IStickersState }) => state.stickers);
  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const { stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const postOrder = () => {
    setLoadingOrder(true);
    dispatch(
      uploadOrder({
        cost: cart.cost,
        address: cart.address,
        number: cart.number_of_sheets,
        cropping: cart.cropping,
        stickers: stickers.slice(0, stickers.length - 1).map((item) => {
          return {
            image: item.image,
            shape: item.shape,
            amount: item.amount,
            width: item.width,
            height: item.height,
          };
        }),
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(closePopup());
        navigate(ORDERS);
        dispatch(
          openInfo({
            title: `${orderPlaced.title}`,
            text: `${orderPlaced.text}`,
            buttonText: `${orderPlaced.buttonText}`,
            //  buttonSecondText: `${orderPlaced.buttonSecondText}`,
            onClick: () => navigate(ADD_STICKERS),
            //   onClickSecond: () => navigate(ORDERS),
            image: image,
          }),
        );
        dispatch(removeAllStickers());
      })
      .catch((err) => {
        if (err.message === '413') {
          dispatch(
            openMessage({
              text: `${messages.itemTooBig}`,
              isError: true,
            }),
          );
        } else {
          dispatch(
            openMessage({
              text: `${messages.somethingWrong}`,
              isError: true,
            }),
          );
        }
      })
      .finally(() => setLoadingOrder(false));
  };

  return (
    <div className={styles.container}>
      {location.pathname === ADD_STICKERS && (
        <h2 className={styles.title}>
          Так будет выглядеть набор на{' '}
          {pages.length.toString().endsWith('1') && !pages.length.toString().endsWith('11')
            ? 'листе'
            : 'листах'}
          <TooltipCustom text={previewShow.warning} />
        </h2>
      )}
      {location.pathname === CART && (
        <div className={styles.block}>
          <h3 className={styles.text}>
            {previewShow.ordering} <TooltipCustom text={previewShow.warning} />{' '}
          </h3>
          <p className={styles.text}>{previewShow.text}</p>
          <div className={styles.buttons}>
            <ButtonWithText className={styles.button} loading={loadingOrder} onClick={postOrder}>
              Продолжить
            </ButtonWithText>
            <ButtonWithText
              className={styles.button}
              theme='transparent'
              onClick={() => dispatch(closePopup())}
            >
              Отменить
            </ButtonWithText>
          </div>
        </div>
      )}

      {pages.length > 0 && (
        <Slider
          {...settings}
          customPaging={function (i: number) {
            return (
              <span className={styles.page_numbers}>
                {i + 1}/{pages.length}
              </span>
            );
          }}
        >
          {pages.map((elementsPage) => {
            const cards = [];
            for (let i = 0; i < elementsPage.length; i++) {
              for (let j = 0; j < elementsPage[i].count; j++) {
                cards.push(elementsPage[i].card);
              }
            }
            return <StickerList key={generateRandomNumber()} cards={cards} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export { PopupPreview };
