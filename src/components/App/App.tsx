import { useState } from 'react';

import { Header } from '../Header';

import styles from './App.module.scss';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <div className={styles.App}>
      <Header onClickSignin={() => setIsLogged(true)} isLogged={isLogged} />
    </div>
  );
}

export { App };
