import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';

import styles from './PopupForm.module.scss';

const PopupForm: React.FC = () => {
  const { form } = useSelector((state: { popup: IPopupState }) => state.popup);

  return <div className={styles.container}>{form.element && <form.element />}</div>;
};

export { PopupForm };
