import {forwardRef} from 'react';

import {IconButton} from "../IconButton/IconButton";

import styles from "./ProfileInput.module.scss";

interface IProps {
  name: string;
  value: string;
  type: 'email' | 'text' | 'submit';
  placeholder?: string,
  onChange: (val: string) => void,
}

const ProfileInput: React.FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  (
    {
      type,
      placeholder,
      value,
      onChange,
    },
    ref
    ) => {

    return (
      <div className={styles.input_container}>
        <input
          value={value}
          ref={ref}
          type={type}
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />

        <IconButton
          className={styles.clear_icon}
          visible={value !== ''}
          icon='clear-field.svg'
          onClick={() => onChange('')}
        />
      </div>
    )
  })

export default ProfileInput;