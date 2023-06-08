import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './TextUnderline.module.scss';

export type TextType = 'button' | 'link';

interface IProps {
  children: React.ReactNode;
  className?: string;
  type?: TextType;
  onClick?: () => void;
}

const TextUnderline: React.FC<IProps> = ({
  children,
  className,
  type = 'button',
  onClick,
}: IProps) => {
  return type === 'button' ? (
    <button type='button' onClick={onClick} className={cn(styles.button, className)}>
      <span className={cn(styles.text, className)}>{children}</span>
    </button>
  ) : type === 'link' ? (
    // TODO: добработать ссылку, когда появится
    <Link to='' className={cn(styles.text, className)}>
      {children}
    </Link>
  ) : null;
};

export { TextUnderline };
