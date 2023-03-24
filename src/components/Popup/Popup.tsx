import {useEffect} from "react";
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { PopupForm } from '../';

import { IPopupState } from '../../interfaces/IPopupState';
import { useAppDispatch } from '../../hooks/hooks';
import { setIsOpen } from '../../store/popupSlice';
import styles from './Popup.module.scss';

const Popup: React.FC = () => {
  const dispatch = useAppDispatch();

  const isOpen = useSelector((state: { popup: IPopupState }) => state.popup.isOpen);

  const onClose = () => {
    dispatch(setIsOpen(false));
  };

    useEffect(() => {
        const handleKeyDown = (evn: KeyboardEvent) => {
            if (evn.code === 'Escape'){
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, []);

  return isOpen
    ? createPortal(
        <div className={styles.overlay}>
          <div className={styles.background} onClick={onClose} />
          <div className={styles.popup}>
            <PopupForm onClose={onClose} />
          </div>
        </div>,
        document.getElementById('app-popup') as HTMLElement,
      )
    : null;
};

export { Popup };
