import cn from 'classnames';

import Slider from 'react-slick';

import { settings } from './settings';
import { StickerImage } from '../';
import { IOrder } from '@shared/interfaces';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './StickerCarousel.module.scss';

interface IProps {
  order: IOrder;
}

const StickerCarousel: React.FC<IProps> = ({ order }: IProps) => {
  const stickers = order.stickers.map((sticker) => {
    return {
      image: sticker.image,
      shape: sticker.shape,
      amount: sticker.amount,
      width: sticker.width,
      height: sticker.height,
      optimal_width: sticker.width,
      optimal_height: sticker.height,
      id: sticker.id,
      size_type: sticker.size_type,
    };
  });

  return stickers.length > 1 ? (
    <Slider {...settings}>
      {order &&
        stickers.map((sticker) => (
          <div className={styles.item} key={sticker.id}>
            {sticker.image ? (
              <div className={styles.item_box}>
                <StickerImage sticker={sticker} boxWidth={210} boxHeight={210} shadow={false} />
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
          <StickerImage sticker={stickers[0]} boxWidth={210} boxHeight={210} shadow={false} />
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
