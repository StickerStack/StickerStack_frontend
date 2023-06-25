import { FC } from 'react';
import cn from 'classnames';

import { TInputField } from '../../../types/TInputField';
import styles from './InputField.module.scss';

const InputField: FC<TInputField> = ({ className = '', children, ...rest }) => {
  return (
    <div className={cn(styles.field, styles[className])} {...rest}>
      {children}
    </div>
  );
};

export { InputField };
