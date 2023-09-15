import { useState } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { ButtonCustom } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { ISticker } from '../../interfaces';
import { ADD_STICKERS, CART, stickerWhiteBorder } from '../../utils/constants';
import { InfoBox } from '../InfoBox/InfoBox';
import { converter } from '../../utils/converter';
import { deleteSticker } from '../../store/stickersSlice';
import { openMessage } from '../../store/popupSlice';
import { messages } from '../../utils/content/popups';
import { Loader } from '../UI/Loader/Loader';

import styles from './Sticker.module.scss';

interface IProps {
  card: ISticker;
  onClick?: () => void;
}

// useState ... [loading, SetLoading] Убрал при рефакторинге, нужно вернуть его обратно.
const Sticker: React.FC<IProps> = ({ card, onClick }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const borderInPx = converter.mmToPx(stickerWhiteBorder);

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteSticker(card.id))
      .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })))
      .finally(() => setLoading(false));
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
    <article
      className={cn(
        styles.card,
        location.pathname === CART && styles.card_cart,
        location.pathname === ADD_STICKERS && styles.card_add,
      )}
      onClick={onClick}
    >
      {loading && <Loader loading={loading} />}
      {card && (
        <ul className={cn(styles.info, location.pathname === CART && styles.info_cart)}>
          {card.image ? (
            <div
              className={cn(styles.border, styles[`border_${card.shape}`])}
              style={{
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
                padding: borderInPx / card.width,
              }}
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
              {`${card.width}*${card.height}`}
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
          className={cn(styles.delete)}
          label='Удалить'
          onClick={handleDelete}
        />
      ) : null}
    </article>
  );
};

export { Sticker };
