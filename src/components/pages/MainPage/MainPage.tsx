import { OurWorks, Benefits, MainHero, FAQ, Instructions } from '@components/index';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <main className={styles.mainPage}>
      <MainHero />
      <OurWorks />
      <Benefits/>
      <Instructions />
      <FAQ />
    </main>
  );
};

export { MainPage };
