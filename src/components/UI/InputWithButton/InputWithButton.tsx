import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';
import styles from './InputWithButton.module.scss';

interface IProps extends TInput {
  button: ReactNode;
}

const InputWithButton: FC<IProps> = ({
  className = '',
  error,
  register,
  option,
  name = '',
  button,
  ...rest
}) => {
  return (
    <div className={cn(styles.field, styles[className], error && styles.error)}>
      <input
        className={cn(styles.input, styles[className], className, error && styles.error)}
        {...(register && register(name, option))}
        name={name}
        id={name}
        {...rest}
      />
      {button}
    </div>
  );
};

export { InputWithButton };
