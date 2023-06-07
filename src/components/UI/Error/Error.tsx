import cn from 'classnames';
import styles from './Error.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Error: React.FC<IProps> = ({ children, className }: IProps) => {
  return <div className={cn(styles.error, className)}>{children}</div>;
};

export { Error };
