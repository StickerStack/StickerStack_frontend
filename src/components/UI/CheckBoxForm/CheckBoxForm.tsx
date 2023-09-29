import { forwardRef } from 'react';
import cn from 'classnames';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions, UseFormRegister } from 'react-hook-form';

import CheckerSvg from '../../../assets/images/icons/checker-icon.svg?react';
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
          <label className={cn(styles.label, error && styles.label_error)} htmlFor={name}>
            <CheckerSvg className={styles.label_svg} />
          </label>
        </div>
        {children}
      </div>
    );
  },
);

export { CheckBoxForm };
