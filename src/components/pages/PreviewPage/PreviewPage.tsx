import cn from 'classnames';
import { cards } from './sample-array';

import styles from './PreviewPage.module.scss';

// В сантиметрах - высота и ширина листа, отступы листа, ширина белой рамки стикера
const pageInitialSize = { height: 382.4, width: 266.49, padding: 5.0, border: 2.5 };
const pxInMm = 3.794;

// В пикселях
const pageSize = {
  height: pageInitialSize.height * pxInMm,
  width: pageInitialSize.width * pxInMm,
  border: pageInitialSize.border * pxInMm,
  padding: pageInitialSize.padding * pxInMm,
};

const PreviewPage: React.FC = () => {
  return (
    <div
      className={styles.container}
      style={{
        width: pageSize.width + pageSize.padding * 2,
        height: pageSize.height + pageSize.padding * 2,
        padding: pageSize.padding,
      }}
    >
      <div
        className={styles.images}
        style={{
          gridTemplateColumns: `repeat(${Math.floor(pageSize.width / 10)}, 10px)`,
          gridTemplateRows: `repeat(${Math.floor(pageSize.height / 10)}, 10px)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              style={{
                padding: pageSize.border,
                width: card.size.width,
                height: card.size.height,
                gridRow: `span ${Math.ceil(card.size.height / 10) + 1}`,
                gridColumn: `span ${Math.ceil(card.size.width / 10) + 1}`,
              }}
              className={cn(card.white_border && styles.border, styles[`border_${card.shape}`])}
            >
              <img
                className={cn(styles.image, styles[`image_${card.shape}`])}
                src={card.image}
                style={
                  card.white_border
                    ? { width: '100%', height: '100%' }
                    : { width: card.size.width, height: card.size.height }
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { PreviewPage };
