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
          return (
            <img
              className={cn(styles.image, styles[`image_${card.shape}`])}
              style={{
                width: `${converter.cmToPx(card.size.width)}px`,
                height: `${converter.cmToPx(card.size.height)}px`
              }}
              key={card.id}
              src={card.image}
            />
          );
      })}
    </div>
  );
};

export { StickerList };
