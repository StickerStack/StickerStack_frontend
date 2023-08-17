import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { closeMessage } from '../../store/popupSlice';
import { ButtonCustom } from '../UI';

import styles from './MessagePopup.module.scss';

const MessagePopup: React.FC = () => {
  const dispatch = useAppDispatch();

  const { message } = useSelector((state: { popup: IPopupState }) => state.popup);

  const handleCloseMessage = () => {
    setTimeout(() => {
      dispatch(closeMessage());
    }, 100);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (message.isOpen) {
      timeoutId = setTimeout(() => handleCloseMessage(), 2650);
    }

    return () => {
      clearTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, [message.isOpen]);

  return (
    <AnimatePresence>
      {message.isOpen && (
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
          <motion.p
            className={`${styles.message} ${message.isError && styles.error} ${
              message.isOpen ? styles.message_opened : ''
            }`}
          >
            {message.text}
            <ButtonCustom
              className={styles.button}
              type='close'
              label='Закрыть'
              onClick={() => handleCloseMessage()}
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
