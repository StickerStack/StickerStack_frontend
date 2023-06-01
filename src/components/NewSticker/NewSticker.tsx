import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { ButtonCustom, RadioButton, TooltipCustom } from '../UI';
import { DragAndDrop } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard } from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';
import { TCardShape } from "../../interfaces/ICard";

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';
import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';

interface IProps {
  card: ICard;
}

const NewSticker: React.FC<IProps> = ({ card }: IProps) => {
  const dispatch = useAppDispatch();
  const [customVisible, setCustomVisible] = useState<boolean>(false);
  const [cardShape, setCardShape] = useState<TCardShape>('square');
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardShape(event.target.value as TCardShape);
  }

  return (
    <div className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop card={card} />
        </div>

        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <div className={styles.shapes}>
            <input className={styles.radio}
               type="radio"
               id={`${card.id}-shape-square`}
               name={`${card.id}-shape`}
               value="square"
               checked={cardShape === "square"}
               onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-square`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <RectSvg />
                </div>
                <span className={styles.shape_title}>Квадрат</span>
              </div>
            </label>

            <input className={styles.radio}
               type="radio"
               id={`${card.id}-shape-rounded-square`}
               name={`${card.id}-shape`}
               value="rounded-square"
               checked={cardShape === "rounded-square"}
               onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-rounded-square`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <RectRondedSvg />
                </div>
                <span className={styles.shape_title}>Закругленный квадрат</span>
              </div>
            </label>

            <input className={styles.radio}
               type="radio"
               id={`${card.id}-shape-circle`}
                name={`${card.id}-shape`}
               value="circle"
               checked={cardShape === "circle"}
               onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-circle`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <CircleSvg />
                </div>
                <span className={styles.shape_title}>Круг</span>
              </div>
            </label>

            <input className={styles.radio}
               type="radio"
               id={`${card.id}-shape-contour`}
               name={`${card.id}-shape`}
               value="contour"
               checked={cardShape === "contour"}
               onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-contour`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <ContourSvg />
                </div>
                <span className={styles.shape_title}>По контуру</span>
              </div>
            </label>
          </div>
        </fieldset>
        <div className={styles.flex}>
          <p className={styles.category}>Количество стикеров</p>
          <input className={cn(styles.input, styles.quantity_input)} />
        </div>
        <fieldset className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <div className={styles.options}>
            <RadioButton name='size' value='optimal' onClick={() => setCustomVisible(false)}>
              Оптимальный размер
              <TooltipCustom text={tooltipText} />
            </RadioButton>
            <RadioButton name='size' value='custom' onClick={() => setCustomVisible(true)}>
              Свой размер
              <div className={cn(customVisible ? styles.visible : styles.hidden)}>
                <input className={cn(styles.input, styles.size_input)} placeholder='ширина' /> x{' '}
                <input className={cn(styles.input, styles.size_input)} placeholder='высота' />
                <span className={cn(customVisible ? styles.visible : styles.hidden)}> см</span>
              </div>
            </RadioButton>
          </div>
        </fieldset>
        <div className={styles.flex}>
          <p className={styles.category}>Цвет фона</p>
          <label className={styles.text}>
            белый
            <input type='checkbox' />
          </label>
        </div>
        <div className={styles.flex}>
          <p className={styles.category}>Материал</p>
          <p className={styles.text}>винил</p>
        </div>
      </form>
      {cards.length > 1 ? (
        <ButtonCustom
          type='delete'
          className={styles.delete}
          label='Удалить'
          onClick={handleDelete}
        />
      ) : null}
    </div>
  );
};

export { NewSticker };
