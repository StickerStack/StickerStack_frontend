import cn from 'classnames';
import styles from './RadioButton.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  onClick?: () => void;
}

const RadioButton: React.FC<IProps> = ({
  children,
  className,
  name,
  value,
  checked,
  onClick,
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
      />
      {children}
    </label>
  );
};

export { RadioButton };
