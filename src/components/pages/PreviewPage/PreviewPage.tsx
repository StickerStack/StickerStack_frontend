import cn from 'classnames';
import image from '../../../images/logo.svg';
import styles from './PreviewPage.module.scss';

const pageSize = { height: 1127, width: 797, padding: 16, gap: 12 };

const cards = [
  {
    image: image,
    id: 9,
    size: { width: 100, height: 100 },
    shape: 'rounded-square',
  },
  {
    image: image,
    id: 10,
    size: { width: 100, height: 100 },
    shape: 'rounded-square',
    white_border: { width: 5 },
  },
  {
    image: image,
    id: 11,
    size: { width: 130, height: 130 },
    shape: 'rounded-square',
    white_border: { width: 5 },
  },
  {
    image: image,
    id: 12,
    size: { width: 130, height: 130 },
    shape: 'square',
    white_border: { width: 5 },
  },
  { image: image, id: 6, size: { width: 130, height: 130 }, shape: 'rounded-square' },
  {
    image: image,
    id: 1,
    size: { width: 200, height: 200 },
    shape: 'square',
    white_border: { width: 5 },
  },
  { image: image, id: 2, size: { width: 200, height: 200 }, shape: 'circle' },
  { image: image, id: 4, size: { width: 200, height: 200 }, shape: 'rounded-square' },
  {
    image: image,
    id: 3,
    size: { width: 240, height: 240 },
    shape: 'rounded-square',
    white_border: { width: 10 },
  },
  { image: image, id: 8, size: { width: 240, height: 240 }, shape: 'rounded-square' },
  { image: image, id: 7, size: { width: 250, height: 250 }, shape: 'circle' },
  {
    image: image,
    id: 5,
    size: { width: 350, height: 350 },
    shape: 'rounded-square',
    white_border: { width: 10 },
  },
  {
    image: image,
    id: 5,
    size: { width: 350, height: 350 },
    shape: 'circle',
    white_border: { width: 10 },
  },
];

const PreviewPage: React.FC = () => {
  return (
    <div
      className={styles.container}
      style={{
        width: pageSize.width,
        height: pageSize.height,
        padding: pageSize.padding,
        gap: pageSize.gap,
      }}
    >
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            style={{ width: card.size.width, height: card.size.height }}
            className={cn(
              card.white_border && styles.border,
              styles[`border_${card.white_border?.width}`],
              styles[`border_${card.shape}`],
            )}
          >
            <img
              className={cn(styles.image, styles[`image_${card.shape}`])}
              src={image}
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
  );
};

export { PreviewPage };
