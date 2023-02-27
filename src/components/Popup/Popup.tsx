import { createPortal } from 'react-dom';
import { PopupForm } from '../PopupForm';
import styles from './Popup.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<IProps> = ({ isOpen, onClose }: IProps) => {
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
