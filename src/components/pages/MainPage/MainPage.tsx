import { OurWorks } from '../../OurWorks/OurWorks';
import { MainHero } from '../../MainHero/MainHero';
import { FAQ } from '../../FAQ/FAQ';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <main className={styles.mainPage}>
      <MainHero />
      <OurWorks />
      <FAQ />
    </main>
  );
};

export { MainPage };
