import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import { Header } from '../Header';
import { Popup } from '../Popup';
import { Signin } from '../Signin';

import styles from './App.module.scss';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.app}>
      <div id='app-popup' />
      <Header
        onClickSignin={() => {
          setIsLogged(true);
          setIsOpen(true);
        }}
        isLogged={isLogged}
      />
      <Popup isOpen={isOpen} onClose={setClose} />
      <Routes>
        <Route path='form-test' element={<Signin />}  />
      </Routes>
    </div>
  );
};

export { App };
