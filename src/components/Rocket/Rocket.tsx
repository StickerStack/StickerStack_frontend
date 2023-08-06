import cn from 'classnames';
import styles from './Rocket.module.scss';
import { ReactComponent as RocketSvg } from '../../images/rocket.svg';
import { TitlePage } from '../UI';

const Rocket: React.FC = () => {
  return (
    <div className={styles.container}>
      <TitlePage type='section-title' className={styles.text}>
        Загрузка
        <div className={styles.dots} />
      </TitlePage>
      <div className={styles.move}>
        <RocketSvg className={styles.rocket} />
      </div>
      <div className={cn(styles.group, styles.group_first)}></div>
      <div className={cn(styles.group, styles.group_second)}></div>
      <div className={cn(styles.group, styles.group_third)}></div>
      <div className={cn(styles.group, styles.group_fourth)}></div>
    </div>
  );
};

export { Rocket };
