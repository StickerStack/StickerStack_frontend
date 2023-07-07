import Slider from 'react-slick';

import { settings } from './settings';
import { Container, TitlePage } from '../UI';

import image from '../../images/image-stikerstack.png';
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

const OurWorks: React.FC = () => {
  return (
    <Container className={styles.container}>
      <TitlePage type='section-title' className={styles.title}>
        Примеры работ
      </TitlePage>
      <p className={styles.text}>
        На странице можно увидеть наши работы и почувствовать настоящую волну вдохновения. Мы делаем
        стикеры на разные темы, включая музыку, спорт, животных, еду и многое другое. Посмотрите на
        наши работы и поймите, что все, что вам нужно, это загрузить свою любимую картинку и дать
        нам возможность превратить ее в стикер.
      </p>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className={styles.image_container}>
            <img src={image.image} alt={image.alt} className={styles.image} />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export { OurWorks };
