import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen } from '../../store/popupSlice';

import styles from './MessagePopup.module.scss';

const MessagePopup: React.FC = () => {
  const dispatch = useAppDispatch();

  const messageIsOpen = useSelector((state: { popup: IPopupState }) => state.popup.messageIsOpen);
  const message = useSelector((state: { popup: IPopupState }) => state.popup.message);
  const [closing, setClosing] = useState<boolean>(false);

  function closeMessage() {
    setClosing(true);
    setTimeout(() => {
      dispatch(setMessageIsOpen([false, '']));
      setClosing(false);
    }, 340);
  }

  useEffect(() => {
    if (messageIsOpen) {
      setTimeout(() => closeMessage(), 8000);
    }
  }, [messageIsOpen]);

  return messageIsOpen
    ? createPortal(
        <div className={styles.message__block}>
          <p className={`${styles.message} ${messageIsOpen ? styles.message_opened : ''} ${closing ? styles.message_closed : ''}`}>
            {message}
            <button className={styles.button} onClick={() => closeMessage()} />
          </p>
        </div>,
        document.getElementById('app-popup') as HTMLElement,
      )
    : null;
};

export { MessagePopup };
