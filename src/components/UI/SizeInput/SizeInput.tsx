import cn from 'classnames';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import styles from './SizeInput.module.scss';

interface IProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const SizeInput: React.FC<IProps> = ({ name, placeholder, register, option, error }: IProps) => {
  return (
    <div className={cn(styles.input_container, { [`${styles.border_error}`]: error })}>
      <input
        type='tel'
        className={styles.input}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        {...(register && register(name, option))}
      />
      {/* <span className={styles.error}>{error && `${error.message}`}</span> */}
    </div>
  );
};

export default SizeInput;
