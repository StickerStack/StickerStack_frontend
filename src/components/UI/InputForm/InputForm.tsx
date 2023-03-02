import { EyeButton } from '../EyeButton';

import styles from './InputForm.module.scss';

interface IProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  optionalButton?: { onClick: () => void; text: string };
  optionalEyeButton?: { onClick: () => void; shown: boolean };
  error?: string;
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type = 'text',
  optionalButton,
  optionalEyeButton,
  placeholder,
  error,
}: IProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {optionalButton && (
          <button className={styles.link} onClick={optionalButton.onClick}>
            <span className={styles.link_text}>{optionalButton.text}</span>
          </button>
        )}
      </label>
      <div className={styles.border}>
        <input placeholder={placeholder} type={type} id={name} className={styles.field} />
      </div>
      {optionalEyeButton && (
        <EyeButton onClick={optionalEyeButton.onClick} shown={optionalEyeButton.shown} />
      )}
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export { InputForm };
