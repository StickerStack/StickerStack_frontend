import { FC } from 'react';
import cn from 'classnames';

import { IconButton } from '../../UI';

import { IInput } from '../../../interfaces/IInput';
import styles from './InputProfile.module.scss';

const InputProfile: FC<IInput> = (props) => {
  return (
    <div className={cn(styles.input_container, { [`${styles.border_error}`]: props.error })}>
      <input
        type={props.type}
        className={styles.input}
        placeholder={props.placeholder}
        aria-invalid={props.error ? 'true' : 'false'}
        {...(props.register && props.register(props.name, props.option))}
      />

      <IconButton
        className={styles.clear_icon}
        visible={props.showSubButton || false}
        icon='clear-field.svg'
        onClick={props.onClear}
      />
      <span className={styles.error}>{props.error && `${props.error.message}`}</span>
    </div>
  );
};

export { InputProfile };
