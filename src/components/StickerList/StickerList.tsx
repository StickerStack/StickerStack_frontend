import { useSelector } from 'react-redux';

import { ICardsState } from '../../interfaces';
import styles from './StickerList.module.scss';

const StickerList: React.FC = () => {
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        if (card.image)
          if (card.amount > 1) {
            const elements: JSX.Element[] = [];
            for (let i = 1; i <= card.amount; i++) {
              elements.push(<img className={styles.image} key={card.id + i} src={card.image} />);
            }
            return elements;
          }
        return <img className={styles.image} key={card.id} src={card.image} />;
      })}
    </div>
  );
};

export { StickerList };
