import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import { ButtonCustom } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard } from '../../store/cardsSlice';
import { CartItem, ICard, ISticker } from '../../interfaces';
import { deleteItem, deleteSticker } from '../../store/cartSlice';
import { ADD_STICKERS, CART, stickerWhiteBorder } from '../../utils/constants';
import { InfoBox } from '../InfoBox/InfoBox';
import { converter } from '../../utils/converter';

import styles from './Sticker.module.scss';

interface IProps {
  card: ISticker | ICard;
  onClick?: () => void;
}

const Sticker: React.FC<IProps> = ({ card, onClick }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isUploadpageCard = (obj: any): obj is ICard => {
    return (
      'id' in obj &&
      'amount' in obj &&
      'image' in obj &&
      'shape' in obj &&
      'size' in obj &&
      'valid' in obj
    );
  };

  const isCartpageCard = (obj: any): obj is ISticker => {
    return (
      'id' in obj &&
      'amount' in obj &&
      'image' in obj &&
      'shape' in obj &&
      'height' in obj &&
      'width' in obj
    );
  };

  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  const handleDelete = () => {
    if (card.id && isCartpageCard(card)) {
      dispatch(deleteSticker(card.id));
    }
  };

  const translateShape = () => {
    switch (card.shape) {
      case 'square':
        return 'квадрат';

      case 'rounded_square':
        return 'закругленный квадрат';

      case 'circle':
        return 'круг';

      case 'contour':
        return 'по контуру';
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
      {card && (
        <ul className={cn(styles.info, location.pathname === CART && styles.info_cart)}>
          {card.image ? (
            <div
              className={cn(styles.border, styles[`border_${card.shape}`])}
              style={
                isUploadpageCard(card)
                  ? {
                      width:
                        card.size.width / card.size.height >= 1
                          ? 140
                          : (converter.cmToPx(card.size.width) /
                              converter.cmToPx(card.size.height)) *
                            140,
                      height:
                        card.size.height / card.size.width >= 1
                          ? 140
                          : (converter.cmToPx(card.size.height) /
                              converter.cmToPx(card.size.width)) *
                            140,
                      maxHeight: 140,
                      maxWidth: 140,
                      padding: (borderInPx / converter.cmToPx(card.size.width)) * 140,
                    }
                  : isCartpageCard(card)
                  ? {
                      width:
                        card.width / card.height >= 1
                          ? 140
                          : (converter.cmToPx(card.width) / converter.cmToPx(card.height)) * 140,
                      height:
                        card.height / card.width >= 1
                          ? 140
                          : (converter.cmToPx(card.height) / converter.cmToPx(card.width)) * 140,
                      maxHeight: 140,
                      maxWidth: 140,
                      padding: (borderInPx / converter.cmToPx(card.width)) * 140,
                    }
                  : {}
              }
            >
              <img
                className={cn(styles.image, styles[`image_${card.shape}`])}
                src={
                  card.image.startsWith('data:image/png;base64,')
                    ? `${card.image}`
                    : `data:image/png;base64,${card.image}`
                }
                alt='Изображение стикера'
              />
            </div>
          ) : (
            <div className={cn(styles.image, styles.image_empty)} />
          )}

          <li className={cn(styles.flex, styles.flex_shapes)}>
            <InfoBox type='simple' description='Форма'>
              {translateShape()}
            </InfoBox>
          </li>
          <li className={styles.flex}>
            <InfoBox type='amount' description='Количество стикеров'>
              {card.amount}
            </InfoBox>
          </li>

          <li className={styles.flex}>
            <InfoBox type='size' description='Размер'>
              {isUploadpageCard(card)
                ? `${Math.round(converter.pxToCm(card.size.width))}*${Math.round(
                    converter.pxToCm(card.size.height),
                  )}`
                : isCartpageCard(card)
                ? `${Math.round(converter.pxToCm(card.width))}*${Math.round(
                    converter.pxToCm(card.height),
                  )}`
                : ''}
            </InfoBox>
          </li>

          <li className={styles.flex}>
            <InfoBox type='simple' description='Цвет фона'>
              <div className={styles.flex}>
                белый
                <div className={styles.color_sample} />
              </div>
            </InfoBox>
          </li>
          <li className={styles.flex}>
            <InfoBox type='simple' description='Материал'>
              винил
            </InfoBox>
          </li>
        </ul>
      )}
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
