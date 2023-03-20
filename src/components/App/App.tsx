import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { switchForm } from '../../store/formSlice';

import { Header, Popup, Signin, ChangePassword, MainPage } from '../';

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
      <Routes>
        <Route path='/' element={<MainPage isLogged={isLogged} openPopup={() => setIsOpen(true)} />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>

      <Popup isOpen={isOpen} onClose={setClose} />
    </div>
  );
};

export { App };
