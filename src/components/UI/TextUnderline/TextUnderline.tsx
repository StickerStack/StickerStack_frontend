import cn from 'classnames';
import { Link, To } from 'react-router-dom';
import styles from './TextUnderline.module.scss';

type TextType = 'button' | 'link';

type TextTheme = 'regular' | 'secondary' | 'contrast';

interface IProps {
  children: React.ReactNode;
  className?: string;
  type?: TextType;
  link?: To;
  theme?: TextTheme;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
}

const TextUnderline: React.FC<IProps> = ({
  children,
  className,
  link,
  type = 'button',
  theme = 'regular',
  title,
  disabled,
  onClick,
}: IProps) => {
  return type === 'button' ? (
    <button
      type='button'
      onClick={onClick}
      className={cn(styles.button, className)}
      title={title}
      disabled={disabled}
    >
      <span className={cn(styles.text, disabled && styles.text_disabled, className)}>
        {children}
      </span>
    </button>
  ) : type === 'link' && link ? (
    <Link to={link} target='_blank' className={cn(styles.text, className, styles[`text_${theme}`])}>
      {children}
    </Link>
  ) : null;
};

export { TextUnderline };
