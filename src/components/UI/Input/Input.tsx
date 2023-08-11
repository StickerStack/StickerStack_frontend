import { FC } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';
import styles from './Input.module.scss';

const Input: FC<TInput> = ({ className = '', error, register, option, name = '', ...rest }) => {
  return (
    <input
      className={cn(styles.input, styles[className], className, error && styles.error)}
      {...(register && register(name, option))}
      name={name}
      id={name}
      {...rest}
    />
  );
};

export { Input };
