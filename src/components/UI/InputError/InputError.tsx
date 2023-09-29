import { FC } from 'react';
import cn from 'classnames';

import { TInputForError } from '@shared/types';
import styles from './InputError.module.scss';

const InputError: FC<TInputForError> = ({ error, className = '' }) => {
  return (
    <span className={cn(styles.error, styles[className], error && styles.error)}>{error && `${error.message}`}</span>
  );
};

export { InputError };
