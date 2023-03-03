import { FieldValues, RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { EyeButton } from "../EyeButton";

import styles from "./InputForm.module.scss";

// FIXME: register type any -> нужен осмысленный тип!!!
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
  register: ((name: string, options?: RegisterOptions<FieldValues, string> | undefined) => UseFormRegisterReturn <string>) | any;
  error?: string;
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type = "text",
  optionalButton,
  optionalEyeButton,
  placeholder,
  register,
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
      <div className={error ? styles.border_error : styles.border}>
        <input
          {...register}
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
