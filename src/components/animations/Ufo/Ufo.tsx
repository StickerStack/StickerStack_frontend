import { Dots } from '@/components/animations/Dots/Dots';

import styles from './Ufo.module.scss';

const Ufo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.move}>
        <div className={styles.object}>
          <div className={styles.light} />
          <div className={styles.ufo} />
        </div>
      </div>
      <Dots text='Ищем ваши заказы' />
    </div>
  );
};

export { Ufo };
