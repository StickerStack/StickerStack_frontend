import React, { forwardRef, useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import {IconButton, TextUnderline} from '../';

import styles from './InputForm.module.scss';

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

const InputForm: React.FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  (
    {
      name,
      label,
      type,
      option,
      register,
      error,
      optionalButton,
      optionalEyeButton,
      placeholder,
    },
    ref
  ) => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePassword = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    return (
      <div className={styles.input}>
        {optionalButton && (
          <span className={styles.link}>
            <TextUnderline type='button' onClick={optionalButton.onClick}>
              {optionalButton.text}
            </TextUnderline>
          </span>
        )}
        <div
          className={
            error ? `${styles.border} ${styles.border_error}` : styles.border
          }
        >
          <input
            className={styles.field}
            placeholder={placeholder}
            type={passwordShown && type === 'password' ? 'text' : type}
            ref={ref}
            name={name}
            id={name}
            {...(register && register(name, option))}
          />
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        </div>
        {optionalEyeButton && (
          <IconButton
            onClick={() => togglePassword()}
            icon={passwordShown ? 'password-shown.svg' : 'password-hidden.svg'}
            className={passwordShown ? styles.icon_show : styles.icon_hidden}
            visible={optionalEyeButton.visible}
          />
        )}
        <span className={styles.error}>{error && `${error.message}`}</span>
      </div>
    );
  }
);

export { InputForm };
