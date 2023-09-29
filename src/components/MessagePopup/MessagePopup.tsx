import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { IPopupState } from '@shared/interfaces';
import { useAppDispatch } from '@shared/hooks/hooks';
import { closeMessage } from '@shared/store';
import { ButtonCustom } from '../UI';

import CheckerSvg from '@images/icons/checker-icon.svg?react';
import ErrorSvg from '@images/icons/button-close.svg?react';
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
    };
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
          <motion.div
            className={`${styles.message} ${message.isError && styles.error} ${
              message.isOpen ? styles.message_opened : ''
            }`}
          >
            <div className={styles.icon_box}>
              <CheckerSvg className={styles.icon} />
              <div className={styles.icon}>
                <div className={styles.icon_line} />
                <div className={styles.icon_line} />
              </div>
            </div>
            {message.text}
            <ButtonCustom className={styles.button} type='close' label='Закрыть' onClick={() => handleCloseMessage()} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { MessagePopup };
