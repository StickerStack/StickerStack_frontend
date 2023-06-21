import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { ButtonCustom } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard } from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';
import { ADD_STICKERS, CART } from '../../utils/constants';

import styles from './Sticker.module.scss';

interface IProps {
  card: ICard;
  onClick?: () => void;
}

const Sticker: React.FC<IProps> = ({ card, onClick }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const translateShape = () => {
    switch (card.shape) {
      case 'square':
        return 'квадрат';
        break;
      case 'rounded-square':
        return 'закругленный квадрат';
        break;
      case 'circle':
        return 'круг';
        break;
      case 'contour':
        return 'по контуру';
        break;
    }
  };

  return (
    <section
      className={cn(
        styles.card,
        location.pathname === CART && styles.card_cart,
        location.pathname === ADD_STICKERS && styles.card_add,
      )}
      onClick={onClick}
    >
      <ul className={cn(styles.info, location.pathname === CART && styles.info_cart)}>
        <img className={styles.image} src={card.image} alt='Изображение стикера' />

        <li className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <span className={styles.text}>{translateShape()}</span>
        </li>

        <li className={styles.flex}>
          <p className={styles.category}>Количество стикеров</p>
          <span className={cn(styles.text, styles.element)}>{card.amount} шт</span>
        </li>

        <div className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <span className={cn(styles.text, styles.element)}>
            {card.size.width}*{card.size.height} см
          </span>
        </div>

        <div className={styles.flex}>
          <p className={styles.category}>Цвет фона</p>
          <p className={styles.text}>белый</p>
          <div className={styles.color_sample} />
        </div>
        <div className={styles.flex}>
          <p className={styles.category}>Материал</p>
          <p className={styles.text}>винил</p>
        </div>
      </ul>
      {location.pathname === CART ? (
        <ButtonCustom
          type='delete'
          className={styles.delete}
          label='Удалить'
          onClick={handleDelete}
        />
      ) : null}
    </section>
  );
};

export { Sticker };
