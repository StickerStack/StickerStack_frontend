import { Container, TitlePage } from '@components/UI';
import {  benefits } from '@static/mainpage';

// import Checker from '@images/icons/checker-icon.svg?react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Benefits.module.scss';

const Benefits: React.FC = () => {

  return (
    <section className={styles.benefits}>
      <Container className={styles.container}>
        <TitlePage type='section-title' className={styles.title}>
          {benefits.title}
        </TitlePage>
        {benefits.items.map((benefit) => (
          <div className={styles.point} key={benefit.id}>
            {/* <Checker className={styles.icon} /> */}
            <p className={styles.text}>{benefit.item}</p>
          </div>
        ))}
      </Container>
    </section>
  );
};

export { Benefits };
