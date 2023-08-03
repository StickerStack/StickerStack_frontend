import { useEffect } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TitlePage, Container, ButtonWithText, TextUnderline } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { Sticker } from '../../Sticker/Sticker';
import { ICardsState, CartState } from '../../../interfaces';
import { InfoBox } from '../../InfoBox/InfoBox';
import { cleanCart, countTotal, uploadOrder } from '../../../store/cartSlice';
import { cleanCards } from '../../../store/cardsSlice';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  useEffect(() => {
    dispatch(countTotal());
    // eslint-disable-next-line
  }, [cart.items]);

  // Пример запроса на оформление заказа

  const postOrder = () => {
    dispatch(
      uploadOrder({
        cost: cart.cost,
        address: 'Москва, ул. Пушкина, дом Калатушкина 25',
        number: cart.number_of_sheets,
        cropping: cart.cropping,
        stickers: [
          { image: cards[0].image, shape: 'square', amount: 5, size: '15' },
          { image: cards[0].image, shape: 'square', amount: 5, size: '15' },
        ],
      }),
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(cleanCards());
        dispatch(cleanCart());
      }
      if (res.meta.requestStatus === 'rejected') {
        console.log('Ошибочка вышла');
      }
    });
  };

  // ...

  return (
    <main className={styles.cart}>
      <Container className={styles.cart_container}>
        <TitlePage type='main-title'>Корзина</TitlePage>
        {cart.items.length === 0 ? (
          <div className={styles.box}>
            <span className={styles.text}>Ваша корзина пуста</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.flex}>
            <div className={cn(styles.banner, styles.cards)}>
              {cart.items.map((card) => (
                <Sticker key={card.id} card={card} />
              ))}
            </div>
            <div className={cn(styles.banner, styles.info)}>
              <InfoBox
                type='number'
                description='Количество листов'
                descriptionClass={styles.description}
              >
                {cart.number_of_sheets}
              </InfoBox>
              {cart.cropping && <span>Вырезать по контуру</span>}
              <InfoBox
                type='number'
                description='Количество стикеров'
                descriptionClass={styles.description}
              >
                {cart.totalAmount}
              </InfoBox>
              <InfoBox type='simple' description='Адрес' className={styles.address_box}>
                <div>
                  <span className={styles.address}>Москва, ул. Пушкина, дом Калатушкина 25</span>
                </div>
              </InfoBox>
              <InfoBox type='simple' description='Итого' numberClass={styles.number}>
                {cart.cost} ₽
              </InfoBox>
              <div className={styles.buttons}>
                <TextUnderline onClick={() => navigate(ADD_STICKERS)}>
                  Редактировать заказ
                </TextUnderline>
                <ButtonWithText className={styles.button} onClick={postOrder}>
                  Оформить заказ
                </ButtonWithText>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export { CartPage };
