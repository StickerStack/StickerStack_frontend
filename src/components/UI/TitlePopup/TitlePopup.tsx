import cn from 'classnames';
import styles from './TitlePopup.module.scss';

interface IProps extends React.HTMLProps<HTMLHeadingElement>{
  children: React.ReactNode;
  className?: string;
}

const TitlePopup: React.FC<IProps> = (props: IProps) => {
  const { children, className } = props;
  return <h2 {...props} className={cn(styles.title, className)}>{children}</h2>;
};

export { TitlePopup };
