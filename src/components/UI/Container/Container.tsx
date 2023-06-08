import cn from 'classnames';

import styles from './Container.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<IProps> = ({ children, className }: IProps) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export { Container };
