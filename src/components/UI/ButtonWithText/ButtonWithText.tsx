import cn from 'classnames';

import { ReactComponent as Loading } from '../../../images/icons/light-button-loading.svg';
import styles from './ButtonWithText.module.scss';

type ButtonTheme = 'filled' | 'transparent' | 'no-border';

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
      {children}
      {loading && <Loading className={styles.loader} />}
    </button>
  );
};

export { ButtonWithText };
