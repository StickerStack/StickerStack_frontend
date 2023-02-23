import { Header } from '../Header';

import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Header isLogged={false} />
    </div>
  );
}

export { App };
