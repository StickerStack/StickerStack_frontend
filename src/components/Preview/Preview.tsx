import Slider from 'react-slick';

import { ButtonCustom } from '../UI';
import { settings } from './settings';
import { pages } from '../../utils/constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Preview.module.scss';

interface IProps {
  onClose: () => void;
}

const Preview: React.FC<IProps> = ({ onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <ButtonCustom className={styles.button} type='close' label='Закрыть' onClick={onClose} />
      <h2 className={styles.title}>Так будет выглядеть набор на листе А4</h2>
      <Slider {...settings}>
        {pages.map((page) => (
          <img
            key={page.link}
            className={styles.page}
            src={page.link}
            alt='Расположение стикеров на листе'
          />
        ))}
      </Slider>
    </div>
  );
};

export { Preview };
