import { IOrderState } from '../../interfaces';
import Slider from 'react-slick';

import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './StickerCarousel.module.scss';

interface IProps {
  order: IOrderState;
}

const stickers = [
  { id: 1, pic: '', size: '?*? см' },
  { id: 2, pic: '', size: '?*? см' },
  { id: 3, pic: '', size: '?*? см' },
];

const StickerCarousel: React.FC<IProps> = ({ order }: IProps) => {
  return (
    <Slider {...settings}>
      {order &&
        stickers.map((sticker) => (
          <div className={styles.item} key={sticker.id}>
            <div className={styles.item_pic} />
            <span className={styles.item_info}>{sticker.size}</span>
          </div>
        ))}
    </Slider>
  );
};

export { StickerCarousel };
