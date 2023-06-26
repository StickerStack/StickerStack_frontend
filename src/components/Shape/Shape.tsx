import { ICard } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';

import styles from './Shape.module.scss';

interface IProps {
  card: ICard;
  shape: TCardShape;
  shapeTitle: string;
  cardShape: TCardShape;
  onShapeChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Shape: React.FC<IProps> = ({ card, shape, shapeTitle, cardShape, onShapeChange }: IProps) => {
  const chooseShape = () => {
    switch (shape) {
      case 'square':
        return <RectSvg />;
      case 'rounded-square':
        return <RectRondedSvg />;
      case 'circle':
        return <CircleSvg />;
      case 'contour':
        return <ContourSvg />;
    }
  };

  return (
    <>
      <input
        className={styles.radio}
        type='radio'
        id={`${card.id}-shape-${shape}`}
        name={`${card.id}-shape`}
        value={shape}
        checked={cardShape === shape}
        onChange={onShapeChange}
      />
      <label className={styles.label} htmlFor={`${card.id}-shape-${shape}`}>
        <div className={styles.shape}>
          <div className={styles.shape_pic}>{chooseShape()}</div>
          <span className={styles.shape_title}>{shapeTitle}</span>
        </div>
      </label>
    </>
  );
};

export { Shape };
