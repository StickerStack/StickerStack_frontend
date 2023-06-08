import cn from 'classnames';
import styles from './ButtonWithText.module.scss';

type ButtonTheme = 'filled' | 'transparent' | 'no-border';

interface IProps {
  children: React.ReactNode;
  className?: string;
  theme?: ButtonTheme;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonWithText: React.FC<IProps> = ({
  children,
  theme = 'filled',
  className,
  type,
  disabled,
  onClick,
}: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${theme}`], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { ButtonWithText };
