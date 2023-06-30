import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';

import styles from './PopupForm.module.scss';

const PopupForm: React.FC = () => {
  const Form = useSelector((state: { popup: IPopupState }) => state.popup.form);

  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export { PopupForm };
