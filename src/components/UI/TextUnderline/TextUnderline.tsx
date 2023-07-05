import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './TextUnderline.module.scss';

type TextType = 'button' | 'link';

type TextTheme = 'regular' | 'contrast';

interface IProps {
  children: React.ReactNode;
  className?: string;
  type?: TextType;
  theme?: TextTheme;
  onClick?: () => void;
}

const TextUnderline: React.FC<IProps> = ({
  children,
  className,
  type = 'button',
  theme = 'regular',
  onClick,
}: IProps) => {
  return type === 'button' ? (
    <button type='button' onClick={onClick} className={cn(styles.button, className)}>
      <span className={cn(styles.text, className)}>{children}</span>
    </button>
  ) : type === 'link' ? (
    // TODO: добработать ссылку, когда появится
    <Link
      to=''
      className={cn(styles.text, className, theme === 'contrast' && styles.text_contrast)}
    >
      {children}
    </Link>
  ) : null;
};

export { TextUnderline };
