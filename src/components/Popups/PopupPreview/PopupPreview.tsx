import Slider from 'react-slick';

import { ButtonCustom } from '../../UI';
import { StickerList } from '../../StickerList/StickerList';

import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';

interface IProps {
  onClose: () => void;
}

const PopupPreview: React.FC<IProps> = ({ onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Так будет выглядеть набор на листе А4</h2>
      <Slider {...settings}>
        <StickerList />
      </Slider>
    </div>
  );
};

export { PopupPreview };
