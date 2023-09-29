import { UseFormRegister, FieldValues } from 'react-hook-form';

import { TShape } from '@shared/types';
import { ISticker } from '@shared/interfaces';

import RectSvg from '@images/icons/rect.svg?react';
import RectRondedSvg from '@images/icons/rect_rounded.svg?react';
import CircleSvg from '@images/icons/circle.svg?react';
import ContourSvg from '@images/icons/contour.svg?react';
import styles from './Shape.module.scss';

interface IProps {
  register?: UseFormRegister<FieldValues>;
  name: string;
  sticker: ISticker;
  value: TShape;
  onShapeChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Shape: React.FC<IProps> = ({
  register,
  name,
  sticker,
  value,

  onShapeChange,
}: IProps) => {
  const chooseShape = () => {
    switch (value) {
      case 'square':
        return <RectSvg />;
      case 'rounded_square':
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
      case 'rounded_square':
        return 'Закругленный квадрат';
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
        id={`${sticker.id}-shape-${value}`}
        name={name}
        value={value}
        onChange={onShapeChange}
      />
      <label className={styles.label} htmlFor={`${sticker.id}-shape-${value}`}>
        <div className={styles.shape}>
          <div className={styles.shape_pic}>{chooseShape()}</div>
          <span className={styles.shape_title}>{translateShape()}</span>
        </div>
      </label>
    </>
  );
};

export { Shape };
