import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { useBlockScroll } from '../../hooks/useBlockScroll';
import { PopupForm } from '../';
import { PopupInfo } from '../Popups/PopupInfo/PopupInfo';
import { PopupPreview } from '../Popups/PopupPreview/PopupPreview';
import { OrderDetails } from '../Popups/OrderDetails/OrderDetails';
import { ButtonCustom } from '../UI';
import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { closePopup } from '../../store/popupSlice';

import styles from './Popup.module.scss';

const Popup: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { blockScroll, unblockScroll } = useBlockScroll();
  const { form, preview, info, order, isOpen } = useSelector(
    (state: { popup: IPopupState }) => state.popup,
  );

  useEffect(() => {
    isOpen ? blockScroll() : unblockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    dispatch(closePopup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (evn: KeyboardEvent) => {
      if (evn.code === 'Escape') {
        dispatch(closePopup());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

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
            onClick={() => dispatch(closePopup())}
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
              {form.isOpen ? (
                <PopupForm />
              ) : order.isOpen ? (
                <OrderDetails order={order.content} onClose={() => dispatch(closePopup())} />
              ) : preview.isOpen ? (
                <PopupPreview />
              ) : info.isOpen ? (
                <PopupInfo />
              ) : null}
              <ButtonCustom
                className={styles.button}
                type='close'
                label='Закрыть'
                onClick={() => dispatch(closePopup())}
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
