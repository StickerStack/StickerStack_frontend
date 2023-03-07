import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchForm } from '../../store/formSlice';

import { Header } from '../Header';
import { Popup } from '../Popup';
import { Signin } from '../Signin';

import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setClose = () => {
    setIsOpen(false);
    dispatch(switchForm(Signin));
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
