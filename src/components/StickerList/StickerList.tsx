import cn from 'classnames';

import { converter } from '../../utils/converter';
import { pageSizePx, stickerWhiteBorder } from '../../utils/constants';
import { ISticker } from '../../interfaces/ISticker';
import styles from './StickerList.module.scss';

interface IProps {
  cards: ISticker[];
}
export const pageSizePxSmall = {
  widthPage: pageSizePx.widthPage / 2,
  heightPage: pageSizePx.heightPage / 2,
  paddingList: {
    top: pageSizePx.paddingList.top / 2,
    right: pageSizePx.paddingList.right / 2,
    bottom: pageSizePx.paddingList.bottom / 2,
    left: pageSizePx.paddingList.left / 2,
  },
  gapX: pageSizePx.gapX / 2,
  gapY: pageSizePx.gapY / 2,
};
const StickerList: React.FC<IProps> = ({ cards }: IProps) => {
  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  return (
    <div
      className={styles.container}
      style={{
        width: pageSizePxSmall.widthPage,
        height: pageSizePxSmall.heightPage,
        padding: `${pageSizePxSmall.paddingList.top}px ${pageSizePxSmall.paddingList.right}px ${pageSizePxSmall.paddingList.bottom}px ${pageSizePxSmall.paddingList.left}px`,
        gridTemplateColumns: `repeat(${Math.floor(pageSizePxSmall.widthPage)}, 1px)`,
        gridTemplateRows: `repeat(${Math.floor(pageSizePxSmall.heightPage)}, 1px)`,
      }}
    >
      {cards.map((card, index) => {
        if (card.id === 'newSticker') {
          return null;
        }

        return (
          <div
            className={cn(styles.border, styles[`border_${card.shape}`])}
            style={{
              width: converter.cmToPx(card.width) / 2,
              height: converter.cmToPx(card.height) / 2,
              padding: borderInPx / 2,
              gridRow: `span ${Math.ceil(converter.cmToPx(card.height) / 2 + pageSizePxSmall.gapY)}`,
              gridColumn: `span ${Math.ceil(converter.cmToPx(card.width) / 2 + pageSizePxSmall.gapX)}`,
            }}
            key={`${card.id}${index}`}
          >
            <img
              className={cn(styles.image, styles[`image_${card.shape}`])}
              src={
                card.image.startsWith('data:image/png;base64,')
                  ? card.image
                  : `data:image/png;base64,${card.image}`
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export { StickerList };
