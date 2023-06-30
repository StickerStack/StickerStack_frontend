import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';

import styles from './PopupForm.module.scss';

const PopupForm: React.FC = () => {
  const { popup } = useSelector((state: { popup: IPopupState }) => state.popup);

  return (
    <div className={styles.container}>
      {popup.element && <popup.element />}
    </div>
  );
};

export { PopupForm };
