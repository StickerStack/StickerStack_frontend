import cn from 'classnames';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TitlePage, Container, ButtonWithText, TextUnderline } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { Sticker } from '../../Sticker/Sticker';
import { ICardsState, CartState } from '../../../interfaces';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  // const items = useSelector((state: { items: CartState }) => state.items.items);

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
              <TextUnderline onClick={() => navigate(ADD_STICKERS)}>
                Вернуться к заказу
              </TextUnderline>
              <ButtonWithText>Оплатить заказ</ButtonWithText>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export { CartPage };
