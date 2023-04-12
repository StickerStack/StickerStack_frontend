import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen } from '../../store/popupSlice';
import { ButtonCustom } from '../UI';

import styles from './MessagePopup.module.scss';

const MessagePopup: React.FC = () => {
  const dispatch = useAppDispatch();

  const messageIsOpen = useSelector(
    (state: { popup: IPopupState }) => state.popup.messageIsOpen
  );
  const message = useSelector(
    (state: { popup: IPopupState }) => state.popup.message
  );
  const messageIsError = useSelector(
    (state: { popup: IPopupState }) => state.popup.messageIsError
  );
  
  const closeMessage = () => {
    setTimeout(() => {
      dispatch(setMessageIsOpen([false, '']));
    }, 330);
  };

  useEffect(() => {
    if (messageIsOpen) {
      setTimeout(() => closeMessage(), 6000);
    }
  }, [messageIsOpen]);

  return (
    <AnimatePresence>
      {messageIsOpen && (
        <motion.div
          className={styles.message_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            transition: {
              duration: 0.5,
            },
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <motion.p className={`${styles.message} ${messageIsError && styles.error} ${messageIsOpen ? styles.message_opened : ''}`}>
            {message} 
            <ButtonCustom
              className={styles.button}
              type='close'
              onClick={() => closeMessage()}
            />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /*
  messageIsOpen
    ? createPortal(
        <div className={styles.message__block}>
          <p
            className={`${styles.message} ${messageIsOpen ? styles.message_opened : ''} ${
              closing ? styles.message_closed : ''
            } ${messageIsError && styles.error}`}
          >
            {message}
            <ButtonCustom className={styles.button} type='close' onClick={() => closeMessage()} />
          </p>
        </div>,
        document.getElementById('app-popup') as HTMLElement,
      )
    : null;
    */
};

export { MessagePopup };
