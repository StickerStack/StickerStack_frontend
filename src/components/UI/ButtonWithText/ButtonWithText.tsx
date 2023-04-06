import cn from 'classnames';
import styles from './ButtonWithText.module.scss';

export type ButtonTheme = 'filled' | 'transparent';

interface IProps {
  children: React.ReactNode;
  theme?: ButtonTheme;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const ButtonWithText: React.FC<IProps> = ({
  children,
  theme = 'filled',
  type,
  onClick,
}: IProps) => {
  return (
    <button className={cn(styles.button, styles[`button_${theme}`])} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export { ButtonWithText };
