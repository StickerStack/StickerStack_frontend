import cn from 'classnames';
import styles from './ButtonWithText.module.scss';

export type ButtonTheme = 'filled' | 'transparent' | 'no-border';

interface IProps {
  children: React.ReactNode;
  className?: string;
  theme?: ButtonTheme;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const ButtonWithText: React.FC<IProps> = ({
  children,
  theme = 'filled',
  className,
  type,
  onClick,
}: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${theme}`], className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export { ButtonWithText };
