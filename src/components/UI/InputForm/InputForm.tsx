import { UseFormRegister, FieldValues } from 'react-hook-form';

import { EyeButton } from "../EyeButton";

import styles from "./InputForm.module.scss";

interface IProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  requiredError?: string;
  minLength?: number;
  minLengthError?: string;
  maxLength?: number;
  maxLengthError?: string;
  patternReg?: RegExp;
  patternError?: string;
  validateFunc?: (val: string) => string;
  optionalButton?: { onClick: () => void; text: string };
  optionalEyeButton?: { onClick: () => void; shown: boolean };
  register: UseFormRegister<FieldValues>;
  error?: string;
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type = "text",
  optionalButton,
  optionalEyeButton,
  placeholder,
  required,
  requiredError,
  patternReg,
  patternError,
  minLength,
  minLengthError,
  maxLength,
  maxLengthError,
  validateFunc,
  register,
  error,
}: IProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {optionalButton && (
          <button className={styles.link} onClick={optionalButton.onClick}>
            {optionalButton.text}
          </button>
        )}
      </label>
      <div className={error ? styles.border_error : styles.border}>
        <input
          {...register(name, {
            required: required && requiredError,
            validate: (val: string) => {
              if(validateFunc) {
                return validateFunc(val);
              }
              return '';
            },
            maxLength: maxLength && {
              value: maxLength,
              message: maxLengthError || ''
            },
            minLength: minLength && {
              value: minLength,
              message: minLengthError || ''
            },
            pattern: patternReg && {
              value: patternReg,
              message: patternError || '' 
            }
          })}
          placeholder={placeholder}
          type={type}
          id={name}
          className={error ? styles.field_error : styles.field}
        />
      </div>
      {optionalEyeButton && (
        <EyeButton
          onClick={optionalEyeButton.onClick}
          shown={optionalEyeButton.shown}
        />
      )}
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export { InputForm };
