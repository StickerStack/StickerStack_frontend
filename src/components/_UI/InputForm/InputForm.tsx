import { FC, useState} from 'react';
import cn from 'classnames';

import { EyeButton, TextUnderline } from '../../UI';

import { IInput } from '../../../interfaces/IInput';
import styles from './InputForm.module.scss';

const InputForm: FC<IInput> = (props) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const eyeButton = props.showSubButton ? (
    <EyeButton visible={props.showSubButton} shown={passwordShown} onClick={() => togglePassword()} />
  ) : null;

  const labelLink = props.labelLink ? (
    <span className={styles.link}>
      <TextUnderline type='button' onClick={props.labelLink.onClick}>
        {props.labelLink.text}
      </TextUnderline>
    </span>
  ) : null;

  return (
    <div className={styles.input}>
      <div className={styles.label_field}>
        <label htmlFor={props.name} className={styles.label}>
          {props.label}
        </label>
        {labelLink}
      </div>

      <div className={props.error ? `${styles.border} ${styles.border_error}` : styles.border}>
        <input
          className={styles.field}
          placeholder={props.placeholder}
          type={passwordShown && props.type === 'password' ? 'text' : props.type}
          id={props.name}
          {...(props.register && props.register(props.name, props.option))}
          name={props.name}
        />
        {eyeButton}
      </div> 
      
      <span className={cn(styles.error, props.error && styles.error_shown)}>
        {props.error && `${props.error.message}`}
      </span>
    </div>
  );
};

export { InputForm };
