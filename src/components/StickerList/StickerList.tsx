import cn from 'classnames';
import { useSelector } from 'react-redux';

import { ICardsState } from '../../interfaces';
import { converter } from "../../utils/converter";

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
              elements.push(
                <img
                  className={cn(styles.image, styles[`image_${card.shape}`])}
                  style={{
                    width: `${card.size.width}px`,
                    height: `${card.size.height}px`
                  }}
                  key={card.id + i}
                  src={card.image}
                />
              );
            }
            return elements;
          }
        return (
          <img
            className={cn(styles.image, styles[`image_${card.shape}`])}
            key={card.id}
            src={card.image}
            style={{
              width: `${card.size.width}px`,
              height: `${card.size.height}px`
            }}
          />
        );
      })}
    </div>
  );
};

export { StickerList };
