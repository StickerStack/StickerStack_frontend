import Slider from 'react-slick';

import { settings } from './settings';
import { Container, TitlePage } from '../UI';
import { ourWorks, benefits } from '../../utils/content/mainpage';

import { ReactComponent as Checker } from '../../images/icons/checker-icon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './OurWorks.module.scss';

const OurWorks: React.FC = () => {
  return (
    <section className={styles.works}>
      <Container className={styles.container}>
        <TitlePage type='section-title' className={styles.title}>
          {ourWorks.title}
        </TitlePage>
        <p className={styles.text}>{ourWorks.text}</p>
        <Slider {...settings}>
          {ourWorks.images.map((image) => (
            <div key={image.id} className={styles.image_container}>
              <img src={image.image} alt={image.alt} className={styles.image} />
            </div>
          ))}
        </Slider>
        <TitlePage type='section-title' className={styles.title}>
          {benefits.title}
        </TitlePage>
        {benefits.items.map((benefit) => (
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
