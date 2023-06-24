import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  RadioButton,
  TextUnderline,
  ButtonWithText,
  TitlePage,
  Container,
  TextForm,
} from '../../UI';
import { NewSticker } from '../../index';
import { setPreviewIsOpen } from '../../../store/popupSlice';
import { pages, pagePrice, CART } from '../../../utils/constants';
import { Sticker } from '../../Sticker/Sticker';
import { CartState } from '../../../interfaces/CartState';
import { ICard, ICardsState } from '../../../interfaces';
import { addCard } from '../../../store/cardsSlice';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const items = useSelector((state: { items: CartState }) => state.items.items);

  return (
    <main>
      <Container className={styles.container}>
        <TitlePage>Корзина</TitlePage>
        <div className={styles.cards}>
          {items.length === 0 ? (
            <TextForm>Ваша корзина пуста</TextForm>
          ) : (
            cards.map((card) => <Sticker key={card.id} card={card} />)
          )}
        </div>
      </Container>
    </main>
  );
};

export { CartPage };
