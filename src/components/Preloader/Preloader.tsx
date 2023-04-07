import preloader from '../../images/preloader.gif'
import styles from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return(
    <div className={styles.preloaderContainer}>
      <img className={styles.preloader} src={preloader}/>
    </div>
  )
};

export { Preloader };