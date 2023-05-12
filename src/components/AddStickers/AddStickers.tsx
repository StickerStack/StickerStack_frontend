import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks/hooks';
import { ButtonWithText, TitlePage } from '../UI';
import { NewSticker } from '../index';
import { ICardsState } from '../../interfaces';
import { addCard } from '../../store/cardsSlice';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const handleAddCard = () => {
    dispatch(addCard({ image: '', shape: '', amount: '', size: '', id: cards.length }));
  };

  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      {cards.map((card) => (
        <NewSticker key={card.id} card={card} id={card.id} />
      ))}

      <ButtonWithText theme='transparent' onClick={handleAddCard}>
        Добавить стикер
      </ButtonWithText>
    </div>
  );
};

export { AddStickers };
