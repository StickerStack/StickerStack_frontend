import cn from 'classnames';
import { Dots } from '../Dots/Dots';

import styles from './CelebratingDog.module.scss';

const CelebratingDog: React.FC = () => {
  return (
    <div className={styles.container}>
      <Dots text='Поздравляем!' />
      <div className={styles.animation}>
        <div className={styles.dog} />
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />{' '}
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />{' '}
        <div className={cn(styles.confetti, styles.confetti_blue)} />
        <div className={cn(styles.confetti, styles.confetti_red)} />
        <div className={cn(styles.confetti, styles.confetti_yellow)} />{' '}
      </div>
    </div>
  );
};

export { CelebratingDog };
