import Slider from 'react-slick';

import { ButtonCustom } from '../UI';
import { settings } from './settings';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Preview.module.scss';
import { StickerList } from '../StickerList/StickerList';

interface IProps {
  onClose: () => void;
}

const Preview: React.FC<IProps> = ({ onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <ButtonCustom className={styles.button} type='close' label='Закрыть' onClick={onClose} />
      <h2 className={styles.title}>Так будет выглядеть набор на листе А4</h2>
      <Slider {...settings}>
        <StickerList />
      </Slider>
    </div>
  );
};

export { Preview };
