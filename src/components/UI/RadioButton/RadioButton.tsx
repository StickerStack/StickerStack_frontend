import { FieldValues, UseFormRegister } from 'react-hook-form';
import cn from 'classnames';
import styles from './RadioButton.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  name: string;
  value?: string;
  checked?: boolean;
  onClick?: () => void;
  register?: UseFormRegister<FieldValues>;
}

const RadioButton: React.FC<IProps> = ({
  children,
  className,
  name,
  value,
  checked,
  onClick,
  register,
}: IProps) => {
  return (
    <label className={styles.label}>
      <input
        type='radio'
        checked={checked}
        name={name}
        value={value}
        className={cn(styles.radio, className)}
        onClick={onClick}
        {...(register && register(name))}
      />
      {children}
    </label>
  );
};

export { RadioButton };
