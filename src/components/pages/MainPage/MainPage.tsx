import { OurWorks, MainHero, FAQ, Instructions } from '@components/index';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <main className={styles.mainPage}>
      <MainHero />
      <OurWorks />
      <Instructions />
      <FAQ />
    </main>
  );
};

export { MainPage };
