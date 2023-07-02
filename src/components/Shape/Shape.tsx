import { UseFormRegister, FieldValues } from 'react-hook-form';
import { ICard } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';

import styles from './Shape.module.scss';

interface IProps {
  register?: UseFormRegister<FieldValues>;
  name: string;
  card: ICard;
  value: TCardShape;
  onShapeChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Shape: React.FC<IProps> = ({
  register,
  name,
  card,
  value,

  onShapeChange,
}: IProps) => {
  const chooseShape = () => {
    switch (value) {
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

  const translateShape = () => {
    switch (value) {
      case 'square':
        return 'Квадрат';
      case 'rounded-square':
        return 'Закругленный вадрат';
      case 'circle':
        return 'Круг';
      case 'contour':
        return 'По контуру';
    }
  };

  return (
    <>
      <input
        {...(register && register(name))}
        className={styles.radio}
        type='radio'
        id={`${card.id}-shape-${value}`}
        name={name}
        value={value}
        onChange={onShapeChange}
      />
      <label className={styles.label} htmlFor={`${card.id}-shape-${value}`}>
        <div className={styles.shape}>
          <div className={styles.shape_pic}>{chooseShape()}</div>
          <span className={styles.shape_title}>{translateShape()}</span>
        </div>
      </label>
    </>
  );
};

export { Shape };
