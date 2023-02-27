import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header';
import { Signin } from '../Signin';

import styles from './App.module.scss';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <div className={styles.app}>
      <Header onClickSignin={() => setIsLogged(true)} isLogged={isLogged} />
      <Routes>
        <Route path='form-test' element={<Signin />}  />
      </Routes>
    </div>
  );
};

export { App };
