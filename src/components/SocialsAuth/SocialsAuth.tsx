import vk from '../../images/icons/vk-icon.svg';
import google from '../../images/icons/google-icon.svg';
import env from '../../images/icons/envelope-icon.svg';
import styles from './SocialsAuth.module.scss';

const SocialsAuth: React.FC = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.socials}>
        <li className={styles.social}>
          <img src={vk} className={styles.image} alt='Иконка ВКонтакте' />
        </li>
        <li className={styles.social}>
          <img src={google} className={styles.image} alt='Иконка Google' />
        </li>
        <li className={styles.social}>
          <img src={env} className={styles.image} alt='Иконка ' />
        </li>
      </ul>
      <span className={styles.text}>или</span>
    </div>
  );
};

export { SocialsAuth };
