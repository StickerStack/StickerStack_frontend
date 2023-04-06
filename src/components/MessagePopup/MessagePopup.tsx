import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen } from '../../store/popupSlice';

import styles from './MessagePopup.module.scss';
import { ButtonCustom } from '../UI';

const MessagePopup: React.FC = () => {
  const dispatch = useAppDispatch();

  const messageIsOpen = useSelector((state: { popup: IPopupState }) => state.popup.messageIsOpen);
  const message = useSelector((state: { popup: IPopupState }) => state.popup.message);
  const messageIsError = useSelector((state: { popup: IPopupState }) => state.popup.messageIsError);
  const [closing, setClosing] = useState<boolean>(false);

  const closeMessage = () => {
    setClosing(true);
    setTimeout(() => {
      dispatch(setMessageIsOpen([false, '']));
      setClosing(false);
    }, 330);
  };

  useEffect(() => {
    if (messageIsOpen) {
      setTimeout(() => closeMessage(), 6000);
    }
  }, [messageIsOpen]);

  return messageIsOpen
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
};

export { MessagePopup };
