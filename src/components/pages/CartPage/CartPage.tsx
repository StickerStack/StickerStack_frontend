import cn from 'classnames';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TitlePage, Container, ButtonWithText, TextUnderline } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { Sticker } from '../../Sticker/Sticker';
import { ICardsState, CartState } from '../../../interfaces';
import { InfoBox } from '../../InfoBox/InfoBox';
import { uploadOrder } from '../../../store/cartSlice';
import { cleanCards } from '../../../store/cardsSlice';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const settings = useSelector((state: CartState) => state);

  // Пример запроса на оформление заказа

  const postOrder = () => {
    dispatch(
      uploadOrder({
        cost: 1500,
        address: 'Москва, ул. Пушкина, дом Калатушкина 25',
        number: 100,
        cropping: false,
        stickers: [
          { image: cards[0].image, shape: 'square', amount: 5, size: '15' },
          { image: cards[0].image, shape: 'square', amount: 5, size: '15' },
        ],
      }),
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(cleanCards());
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
        {cards.length === 0 ? (
          <div className={styles.box}>
            <span className={styles.text}>Ваша корзина пуста</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.flex}>
            <div className={cn(styles.banner, styles.cards)}>
              {cards.map((card) => (
                <Sticker key={card.id} card={card} />
              ))}
            </div>
            <div className={cn(styles.banner, styles.info)}>
              {settings.cropping ? (
                <span>Вырезать по контуру</span>
              ) : (
                <InfoBox
                  type='number'
                  description='Количество листов'
                  descriptionClass={styles.description}
                >
                  10
                </InfoBox>
              )}

              <InfoBox
                type='number'
                description='Количество стикеров'
                descriptionClass={styles.description}
              >
                100
              </InfoBox>
              <InfoBox type='simple' description='Адрес' className={styles.address_box}>
                <div>
                  <span className={styles.address}>Москва, ул. Пушкина, дом Калатушкина 25</span>
                </div>
              </InfoBox>
              <InfoBox type='simple' description='Итого' numberClass={styles.number}>
                1490 ₽
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
