import cn from 'classnames';
import { Dots } from '../Dots/Dots';

import styles from './Rocket.module.scss';

const Rocket: React.FC = () => {
  return (
    <div className={styles.container}>
      <Dots text='Загрузка' />
      <div className={styles.move}>
        <div className={styles.rocket}>
          <div className={styles.rocket_flameless} />
          <div className={cn(styles.rocket_flame, styles.rocket_flame_red)} />
          <div className={cn(styles.rocket_flame, styles.rocket_flame_orange)} />
          <div className={cn(styles.rocket_flame, styles.rocket_flame_yellow)} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
          <div className={styles.rocket_spark} />
        </div>
      </div>
      <div className={cn(styles.group, styles.group_first)}></div>
      <div className={cn(styles.group, styles.group_second)}></div>
      <div className={cn(styles.group, styles.group_third)}></div>
      <div className={cn(styles.group, styles.group_fourth)}></div>
    </div>
  );
};

export { Rocket };
