//import preloader from '../../images/preloader.gif'
import { Rocket } from '@components/animations/Rocket/Rocket';
import styles from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloaderContainer}>
      <Rocket />
    </div>
  );
};

export { Preloader };
