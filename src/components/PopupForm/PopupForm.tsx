import { useSelector } from 'react-redux';
import { IPopupState } from '../../interfaces/IPopupState';

import styles from './PopupForm.module.scss';
import { ButtonCustom } from '../UI';

interface IProps {
  onClose: () => void;
}

const PopupForm: React.FC<IProps> = ({ onClose }: IProps) => {
  const Form = useSelector((state: { popup: IPopupState }) => state.popup.form);

  return (
    <div className={styles.container}>
      <Form />
      <ButtonCustom className={styles.button} type='close' onClick={onClose} />
    </div>
  );
};

export { PopupForm };
