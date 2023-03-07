import { useSelector } from 'react-redux';

import styles from './PopupForm.module.scss';

interface IProps {
  onClose: () => void;
}

interface IStateForm {
  forms: {
    form: React.FC;
  };
}

const PopupForm: React.FC<IProps> = ({ onClose }: IProps) => {
  const Form = useSelector((state: IStateForm) => state.forms.form);

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
