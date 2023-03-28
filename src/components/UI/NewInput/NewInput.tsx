import { forwardRef, useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { EyeButton } from '../';

import styles from './NewInput.module.scss';

interface IProps {
  name: string;
  label: string;
  type: 'email' | 'text' | 'submit' | 'password';
  placeholder?: string;
  option?: RegisterOptions;
  register?: UseFormRegister<FieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  optionalButton?: { onClick: () => void; text: string };
  optionalEyeButton?: { visible: boolean };
}

const NewInput: React.FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ name, label, type, option, register, error, optionalButton, optionalEyeButton, placeholder }, ref) => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePassword = () => {
      setPasswordShown(passwordShown ? false : true);
    };
    
    return (
      <div className={styles.input}>
        <label htmlFor={name} className={styles.label}>
          {label} 
          {
            optionalButton && (
              <button className={styles.link} onClick={optionalButton.onClick}>
                <span className={styles.link_text}>{optionalButton.text}</span>
              </button>
            )
          }
        </label>
        <div className={error ?  `${styles.border} ${styles.border_error}` : styles.border}>
          <input
            className={styles.field}
            placeholder={placeholder}
            type={passwordShown && type === 'password' ? 'text' : type}
            ref={ref}
            name={name}
            id={name}
            {...(register && register(name, option))}
          />
        </div>
        {optionalEyeButton && (
        <EyeButton
          onClick={() => togglePassword()}
          shown={passwordShown}
          visible={optionalEyeButton.visible}
        />
      )}
        <span className={styles.error}>{error && `${error.message}`}</span>
      </div>
    );
  }
);

export { NewInput };
