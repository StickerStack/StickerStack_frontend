//import preloader from '../../images/preloader.gif'
import { Rocket } from '../animations/Rocket/Rocket';
import styles from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloaderContainer}>
      {/* <img className={styles.preloader} src={preloader}/> */}
      <Rocket />
    </div>
  );
};

export { Preloader };
