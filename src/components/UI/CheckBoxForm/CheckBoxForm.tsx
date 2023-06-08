import { forwardRef } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import styles from './CheckBoxForm.module.scss';

interface IProps {
  children?: React.ReactNode;
  name: string;
  register?: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const CheckBoxForm: React.FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ register, children, name, error, option }, ref) => {
    return (
      <div className={styles.container}>
        <div>
          <input
            className={styles.input}
            id={name}
            type='checkbox'
            ref={ref}
            name={name}
            {...(register && register(name, option))}
          />
          <label className={error ? styles.label_error : styles.label} htmlFor={name} />
        </div>
        {children}
      </div>
    );
  },
);

export { CheckBoxForm };
