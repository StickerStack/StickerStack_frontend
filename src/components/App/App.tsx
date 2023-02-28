import { useState } from 'react';

import { Header } from '../Header';
import { Popup } from '../Popup';

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
          setIsOpen(true);
        }}
        onClickLogout={() => {
          setIsLogged(false);
        }}
        isLogged={isLogged}
      />
      <Popup isOpen={isOpen} onClose={setClose} />
    </div>
  );
};

export { App };
