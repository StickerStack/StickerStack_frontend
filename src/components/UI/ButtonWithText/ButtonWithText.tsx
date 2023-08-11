import cn from 'classnames';

import styles from './ButtonWithText.module.scss';

type ButtonTheme = 'filled' | 'transparent' | 'light' | 'no-border';

interface IProps {
  children: React.ReactNode;
  className?: string;
  theme?: ButtonTheme;
  type?: 'submit' | 'reset' | 'button';
  color?: 'regular' | 'contrast';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonWithText: React.FC<IProps> = ({
  children,
  theme = 'filled',
  color = 'regular',
  className,
  type,
  loading,
  disabled,
  onClick,
}: IProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button_${theme}`],
        styles[`button_${color}`],
        loading && styles.loading,
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <div className={cn(styles.loader, styles[`loader_${theme}`])} /> : children}
    </button>
  );
};

export { ButtonWithText };
