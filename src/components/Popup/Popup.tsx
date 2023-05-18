import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { PopupForm } from '../';
import { Preview } from '../Preview/Preview';
import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setIsOpen } from '../../store/popupSlice';
import styles from './Popup.module.scss';

const Popup: React.FC = () => {
  const dispatch = useAppDispatch();

  const isOpen = useSelector((state: { popup: IPopupState }) => state.popup.isOpen);
  const previewIsOpen = useSelector((state: { popup: IPopupState }) => state.popup.previewIsOpen);

  const onClose = () => {
    dispatch(setIsOpen(false));
  };

  useEffect(() => {
    const handleKeyDown = (evn: KeyboardEvent) => {
      if (evn.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
          className={styles.overlay}
        >
          <motion.div
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
            className={styles.background}
            onClick={onClose}
          ></motion.div>
          <motion.div
            initial={{
              scale: 0.4,
            }}
            animate={{
              transition: {
                duration: 0.5,
              },
              scale: 1,
            }}
            className={styles.popup}
          >
            {previewIsOpen ? <Preview onClose={onClose} /> : <PopupForm onClose={onClose} />}
          </motion.div>
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};

export { Popup };
