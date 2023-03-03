import { useState } from 'react';

import styles from './CheckBoxForm.module.scss';

interface IProps {
  children: React.ReactNode;
}

const CheckBoxForm: React.FC<IProps> = ({ children }: IProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <label className={styles.label} htmlFor='test'>
      <input
        className={styles.input}
        type='checkbox'
        id='test'
        onChange={() => setIsChecked(!isChecked)}
      />
      <span className={isChecked ? styles.checkbox_active : styles.checkbox} />
      {children}
    </label>
  );
};

export { CheckBoxForm };
