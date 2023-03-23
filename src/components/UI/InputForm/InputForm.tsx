import { useState } from 'react';
import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form';

import { EyeButton } from '../';

import styles from './InputForm.module.scss';

// FIXME: register type any -> нужен осмысленный тип!!!
interface IProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validateFunc?: (val: string) => string;
  optionalButton?: { onClick: () => void; text: string };
  optionalEyeButton?: { visible: boolean };
  register:
    | ((
        name: string,
        options?: RegisterOptions<FieldValues, string> | undefined
      ) => UseFormRegisterReturn<string>)
    | any;
  error?: string;
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type = 'text',
  optionalButton,
  optionalEyeButton,
  placeholder,
  register,
  error,
}: IProps) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
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
      <div className={error ? `${styles.border_error} ${styles.border}` : styles.border}>
        <input
          {...register}
          placeholder={placeholder}
          type={passwordShown && type === 'password' ? 'text' : type}
          id={name}
          className={error ? `${styles.field_error} ${styles.field}` : styles.field}
        />
      </div>
      {optionalEyeButton && (
        <EyeButton
          onClick={() => togglePassword()}
          shown={passwordShown}
          visible={optionalEyeButton.visible}
        />
      )}
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export { InputForm };
