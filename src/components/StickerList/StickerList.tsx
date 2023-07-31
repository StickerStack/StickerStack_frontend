import cn from 'classnames';
import { useSelector } from 'react-redux';

import { ICardsState } from '../../interfaces';
import { converter } from '../../utils/converter';
import { pageSize, stickerWhiteBorder } from '../../utils/constants';

import styles from './StickerList.module.scss';

const StickerList: React.FC = () => {
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const pageSizePx = {
    widthPage: converter.mmToPx(pageSize.widthPage) / 2,
    heightPage: converter.mmToPx(pageSize.heightPage) / 2,
    paddingList: {
      top: converter.mmToPx(pageSize.paddingList.top) / 2,
      right: converter.mmToPx(pageSize.paddingList.right) / 2,
      bottom: converter.mmToPx(pageSize.paddingList.bottom) / 2,
      left: converter.mmToPx(pageSize.paddingList.left) / 2,
    },
    gapX: converter.mmToPx(pageSize.gapX) / 2,
    gapY: converter.mmToPx(pageSize.gapY) / 2,
  };

  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  return (
    <div
      className={styles.container}
      style={{
        width: pageSizePx.widthPage,
        height: pageSizePx.heightPage,
        padding: `${pageSize.paddingList.top}px ${pageSize.paddingList.right}px ${pageSize.paddingList.bottom}px ${pageSize.paddingList.left}px`,
        gridTemplateColumns: `repeat(${Math.floor(pageSizePx.widthPage)}, 1px)`,
        gridTemplateRows: `repeat(${Math.floor(pageSizePx.heightPage)}, 1px)`,
      }}
    >
      {cards.map((card) => {
        const elements: JSX.Element[] = [];
        for (let i = 1; i <= card.amount; i++) {
          elements.push(
            <div
              className={cn(styles.border, styles[`border_${card.shape}`])}
              style={{
                width: card.size.width / 2,
                height: card.size.height / 2,
                padding: borderInPx / 2,
                gridRow: `span ${Math.ceil(card.size.height / 2 + pageSizePx.gapY)}`,
                gridColumn: `span ${Math.ceil(card.size.width / 2 + pageSizePx.gapX)}`,
              }}
              key={card.id + i}
            >
              <img className={cn(styles.image, styles[`image_${card.shape}`])} src={card.image} />
            </div>,
          );
        }
        return elements;
      })}
    </div>
  );
};

export { StickerList };
