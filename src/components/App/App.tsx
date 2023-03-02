import { useState } from 'react';
import { api } from '../../utils/api';

import { Header } from '../Header';
import { Popup } from '../Popup';

import styles from './App.module.scss';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');


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
      <input onChange={(e) => setLogin(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} />

      <button onClick={() => { 
        console.log(api.signUp(login, password));
      }}>erer</button>
    </div>
  );
};

export { App };
