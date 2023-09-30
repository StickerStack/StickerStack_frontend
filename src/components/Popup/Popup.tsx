import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { PopupInfo, PopupForm, PopupPreview, OrderDetails } from '@components/Popups';
import { ButtonCustom } from '@components/UI';
import { IPopupState } from '@shared/interfaces';
import { useAppDispatch, useBlockScroll } from '@shared/hooks';
import { closePopup } from '@shared/store';

import styles from './Popup.module.scss';

const Popup: React.FC = () => {
  const dispatch = useAppDispatch();

  const { blockScroll, unblockScroll } = useBlockScroll();
  const { form, preview, info, order, isOpen } = useSelector((state: { popup: IPopupState }) => state.popup);

  useEffect(() => {
    isOpen ? blockScroll() : unblockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
            exit={{
              scale: 1.4,
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            className={styles.popup}
          >
            <div className={styles.container}>
              {form.isOpen ? (
                <PopupForm />
              ) : order.isOpen ? (
                <OrderDetails order={order.content} />
              ) : preview.isOpen ? (
                <PopupPreview />
              ) : info.isOpen ? (
                <PopupInfo />
              ) : null}
              <div className={styles.button_box}>
                <ButtonCustom
                  className={styles.button}
                  type='close'
                  label='Закрыть'
                  onClick={() => dispatch(closePopup())}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};

export { Popup };
