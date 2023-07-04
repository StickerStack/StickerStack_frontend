import { OurWorks } from '../../OurWorks/OurWorks';
import { MainHero } from '../../MainHero/MainHero';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <main className={styles.mainPage}>
      <MainHero />
      <OurWorks />
    </main>
  );
};

export { MainPage };
