import cn from 'classnames';
import { useSelector } from 'react-redux';

import { ICardsState } from '../../interfaces';
import { converter } from '../../utils/converter';
import { pageSize, stickerWhiteBorder } from '../../utils/constants';

import styles from './StickerList.module.scss';

const StickerList: React.FC = () => {
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const pageSizePx = {
    widthPage: converter.mmToPx(pageSize.widthPage),
    heightPage: converter.mmToPx(pageSize.heightPage),
    paddingList: {
      top: converter.mmToPx(pageSize.paddingList.top),
      right: converter.mmToPx(pageSize.paddingList.right),
      bottom: converter.mmToPx(pageSize.paddingList.bottom),
      left: converter.mmToPx(pageSize.paddingList.left),
    },
    gapX: converter.mmToPx(pageSize.gapX),
    gapY: converter.mmToPx(pageSize.gapY),
  };

  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  return (
    <div
      className={styles.container}
      style={{
        width: pageSizePx.widthPage / 2,
        height: pageSizePx.heightPage / 2,
        padding: `${pageSize.paddingList.top / 2}px ${pageSize.paddingList.right / 2}px ${
          pageSize.paddingList.bottom / 2
        }px ${pageSize.paddingList.left / 2}px`,
        gridTemplateColumns: `repeat(${Math.floor(pageSizePx.widthPage / 2 / 10)}, 10px)`,
        gridTemplateRows: `repeat(${Math.floor(pageSizePx.heightPage / 2 / 10)}, 10px)`,
      }}
    >
      {cards.map((card) => {
        if (card.amount > 1) {
          const elements: JSX.Element[] = [];
          for (let i = 1; i <= card.amount; i++) {
            elements.push(
              <div
                className={cn(styles.border, styles[`border_${card.shape}`])}
                style={{
                  width: card.size.width / 2,
                  height: card.size.height / 2,
                  padding: borderInPx / 2,
                  gridRow: `span ${Math.ceil(card.size.height / 2 / 10) + 1}`,
                  gridColumn: `span ${Math.ceil(card.size.width / 2 / 10) + 1}`,
                }}
                key={card.id + i}
              >
                <img className={cn(styles.image, styles[`image_${card.shape}`])} src={card.image} />
              </div>,
            );
          }
          return elements;
        } else
          return (
            <div
              className={cn(styles.border, styles[`border_${card.shape}`])}
              style={{
                width: card.size.width / 2,
                height: card.size.height / 2,
                padding: borderInPx / 2,
                gridRow: `span ${Math.ceil(card.size.height / 2 / 10) + 1}`,
                gridColumn: `span ${Math.ceil(card.size.width / 2 / 10) + 1}`,
              }}
              key={card.id}
            >
              <img className={cn(styles.image, styles[`image_${card.shape}`])} src={card.image} />
            </div>
          );
      })}
    </div>
  );
};

export { StickerList };
