import { useSelector } from 'react-redux';
import { IPopupState } from '../../interfaces/IPopupState';

import styles from './PopupForm.module.scss';

interface IProps {
  onClose: () => void;
}

const PopupForm: React.FC<IProps> = ({ onClose }: IProps) => {
  const Form = useSelector((state: { popup: IPopupState}) => state.popup.form);

  return (
    <div className={styles.container}>
      <Form />
      <button
        className={styles.button}
        type='button'
        aria-label='Закрыть'
        onClick={onClose}
      />
    </div>
  );
};

export { PopupForm };
