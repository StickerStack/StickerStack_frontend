import cn from 'classnames';
import styles from './TitlePopup.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const TitlePopup: React.FC<IProps> = ({ children, className }: IProps) => {
  return <h2 className={cn(styles.title, className)}>{children}</h2>;
};

export { TitlePopup };
