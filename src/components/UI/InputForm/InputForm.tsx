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
  maxLenght: number;
  maxLenghtError: string;
  patternReg?: RegExp;
  patternError?: string;
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
  maxLenght,
  maxLenghtError,
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
      <div className={styles.border}>
        <input
          {...register(name, {
            required: required && requiredError,
            maxLength: {
              value: maxLenght,
              message: maxLenghtError
            },
            pattern: patternReg && {
              value: patternReg,
              message: patternError || '' 
            }
          })}
          placeholder={placeholder}
          type={type}
          id={name}
          className={styles.field}
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
