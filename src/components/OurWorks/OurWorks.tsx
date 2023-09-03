import Slider from 'react-slick';

import { settings } from './settings';
import { Container, TitlePage } from '../UI';

import image from '../../images/image-stikerstack.png';
import { ReactComponent as Checker } from '../../images/icons/checker-icon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './OurWorks.module.scss';

const images = [
  { image: image, id: 1, alt: 'Пример работы' },
  { image: image, id: 2, alt: 'Пример работы' },
  { image: image, id: 3, alt: 'Пример работы' },
  { image: image, id: 4, alt: 'Пример работы' },
  { image: image, id: 5, alt: 'Пример работы' },
];

const benefits = [
  {
    item: 'Вы платите фиксированную цену за печатный лист, а не за каждый отдельный стикер. Набросайте много картинок на лист и общая стоимость останется прежней! Два стикера на листе – это 290 рублей, 22 стикера на одном листе – все еще 290 рублей.',
    id: 1,
    alt: 'Пример работы',
  },
  {
    item: 'В процессе заказа вы можете экспериментировать с различными параметрами стикеров и просматривать, как это будет выглядеть на макете.',
    id: 2,
  },
  {
    item: 'Наша программа компактно размещает стикеры, чтобы вы не платили за пустое место на листе.',
    id: 3,
  },
  { item: 'Мы гарантируем быстрое и качественное изготовление каждого стикера.', id: 4 },
];

const OurWorks: React.FC = () => {
  return (
    <section className={styles.works}>
      <Container className={styles.container}>
        <TitlePage type='section-title' className={styles.title}>
          Наши работы
        </TitlePage>
        <p className={styles.text}>
          Все, что вам нужно, — загрузить любимую картинку и дать нам возможность превратить ее в
          стикер.
        </p>
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id} className={styles.image_container}>
              <img src={image.image} alt={image.alt} className={styles.image} />
            </div>
          ))}
        </Slider>
        <TitlePage type='section-title' className={styles.title}>
          Почему заказать стикеры в StickerStack удобно и выгодно?
        </TitlePage>
        {benefits.map((benefit) => (
          <div className={styles.point} key={benefit.id}>
            <Checker className={styles.icon} />
            <p className={styles.point}>{benefit.item}</p>
          </div>
        ))}
      </Container>
    </section>
  );
};

export { OurWorks };
