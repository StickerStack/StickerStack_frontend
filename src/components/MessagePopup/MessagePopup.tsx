import { useEffect } from 'react';
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

  useEffect(() => {
    if (messageIsOpen) {
      setTimeout(() => dispatch(setMessageIsOpen([false, ''])), 10000);
    }
  }, [messageIsOpen]);

  return messageIsOpen
    ? createPortal(
        <p className={styles.message}>{message}</p>,

        document.getElementById('app-popup') as HTMLElement,
      )
    : null;
};

export { MessagePopup };
