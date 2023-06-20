import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { PopupForm } from '../';
import { PopupInfo } from '../Popups/PopupInfo/PopupInfo';
import { PopupPreview } from '../Popups/PopupPreview/PopupPreview';
import { ButtonCustom } from '../UI';
import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setFormIsOpen, setInfoIsOpen, setPreviewIsOpen } from '../../store/popupSlice';
import styles from './Popup.module.scss';

const Popup: React.FC = () => {
  const dispatch = useAppDispatch();

  const popup = useSelector((state: { popup: IPopupState }) => state.popup);

  const onClose = () => {
    dispatch(setFormIsOpen(false));
    dispatch(setPreviewIsOpen(false));
    dispatch(
      setInfoIsOpen({
        infoIsOpen: false,
        title: '',
        text: '',
        buttonText: '',
      }),
    );
    if (localStorage.getItem('change-password-token')) {
      localStorage.removeItem('change-password-token');
    }
    if (localStorage.getItem('email')) {
      localStorage.removeItem('email');
    }
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
  }, []);

  return (
    <AnimatePresence>
      {popup.isOpen && (
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
            <div className={styles.container}>
              {popup.previewIsOpen ? (
                <PopupPreview onClose={onClose} />
              ) : popup.formIsOpen ? (
                <PopupForm />
              ) : popup.infoIsOpen ? (
                <PopupInfo onClick={onClose} />
              ) : null}
              <ButtonCustom
                className={styles.button}
                type='close'
                label='Закрыть'
                onClick={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};

export { Popup };
