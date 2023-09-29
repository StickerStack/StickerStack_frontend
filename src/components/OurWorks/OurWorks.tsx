import { useRef } from 'react';
import Slider from 'react-slick';

import { settings } from './settings';
import { Container, TitlePage } from '../UI';
import { ourWorks, benefits } from '../../assets/static/mainpage';

import Checker from '@images/icons/checker-icon.svg?react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './OurWorks.module.scss';

const OurWorks: React.FC = () => {
  const sliderRef = useRef<Slider | null>();

  const nextSlide = () => {
    sliderRef.current && sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current && sliderRef.current.slickPrev();
  };

  return (
    <section className={styles.works}>
      <Container className={styles.container}>
        <TitlePage type='section-title' className={styles.title}>
          {ourWorks.title}
        </TitlePage>
        <p className={styles.text}>{ourWorks.text}</p>
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {ourWorks.images.map((image) => (
            <img key={image.id} src={image.image} alt={image.alt} className={styles.image} />
          ))}
        </Slider>
        <div className={styles.arrows}>
          <div className={styles.prev_arrow} onClick={() => prevSlide()} />
          <div className={styles.next_arrow} onClick={() => nextSlide()} />
        </div>
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
