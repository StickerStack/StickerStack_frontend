import { forwardRef } from 'react';

import { IconButton } from "../IconButton/IconButton";

import styles from "./ProfileInput.module.scss";

interface IProps {
  name: string;
  type: 'email' | 'text' | 'submit';
  placeholder?: string,
}

const ProfileInput: React.FC<IProps> = forwardRef<HTMLInputElement, IProps>(({ type, placeholder }) => {
  return (
    <div className={styles.input_container}>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
      />

      <IconButton
        className={styles.clear_icon}
        visible={true}
        icon='clear-field.svg'/>
    </div>
  )
})

export default ProfileInput;