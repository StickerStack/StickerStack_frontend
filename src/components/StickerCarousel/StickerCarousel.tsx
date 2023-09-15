import cn from 'classnames';
import { IOrder } from '../../interfaces';
import Slider from 'react-slick';
import { stickerWhiteBorder } from '../../utils/constants';

import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './StickerCarousel.module.scss';

interface IProps {
  order: IOrder;
}

const StickerCarousel: React.FC<IProps> = ({ order }: IProps) => {
  const stickers = order.stickers.map((sticker) => {
    return {
      image: 'data:image/png;base64,' + sticker.image,
      shape: sticker.shape,
      amount: sticker.amount,
      width: sticker.width,
      height: sticker.height,
      id: sticker.id,
    };
  });

  return stickers.length > 1 ? (
    <Slider {...settings}>
      {order &&
        stickers.map((sticker) => (
          <div className={styles.item} key={sticker.id}>
            {sticker.image ? (
              <div className={styles.item_box}>
                <div
                  className={cn(styles.border, styles[`border_${sticker.shape}`])}
                  style={{
                    width:
                      sticker.width / sticker.height >= 1
                        ? 210
                        : (sticker.width / sticker.height) * 210,
                    height:
                      sticker.height / sticker.width >= 1
                        ? 210
                        : (sticker.height / sticker.width) * 210,
                    padding: (stickerWhiteBorder / 10 / sticker.width) * 210,
                  }}
                >
                  <img
                    className={cn(styles.item_image, styles[`item_image_${sticker.shape}`])}
                    src={sticker.image}
                    alt='Изображение стикера'
                  />
                </div>
              </div>
            ) : (
              <div className={styles.item_pic} />
            )}

            <span className={styles.item_info}>
              {sticker.width} x {sticker.height} см ({sticker.amount} шт)
            </span>
          </div>
        ))}
    </Slider>
  ) : (
    <div className={cn(styles.item, styles.item_single)}>
      {stickers[0].image ? (
        <div className={styles.item_box}>
          <div
            className={cn(styles.border, styles[`border_${stickers[0].shape}`])}
            style={{
              width:
                stickers[0].width / stickers[0].height >= 1
                  ? 210
                  : (stickers[0].width / stickers[0].height) * 210,
              height:
                stickers[0].height / stickers[0].width >= 1
                  ? 210
                  : (stickers[0].height / stickers[0].width) * 210,
              padding: (stickerWhiteBorder / 10 / stickers[0].width) * 210,
            }}
          >
            <img
              className={cn(styles.item_image, styles[`item_image_${stickers[0].shape}`])}
              src={stickers[0].image}
              alt='Изображение стикера'
            />
          </div>
        </div>
      ) : (
        <div className={styles.item_pic} />
      )}

      <span className={styles.item_info}>
        {stickers[0].width} x {stickers[0].height} см ({stickers[0].amount} шт)
      </span>
    </div>
  );
};

export { StickerCarousel };
