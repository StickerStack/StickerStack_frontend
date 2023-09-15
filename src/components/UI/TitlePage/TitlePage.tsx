import cn from 'classnames';

import styles from './TitlePage.module.scss';

type TitleType = 'main-title' | 'section-title';

interface IProps {
  type: TitleType;
  children: React.ReactNode;
  className?: string;
}

const TitlePage: React.FC<IProps> = ({ type, children, className }: IProps) => {
  return type === 'main-title' ? (
    <h1 className={cn(styles.title, className)}>{children}</h1>
  ) : type === 'section-title' ? (
    <h2 className={cn(styles.title, styles.title_section, className)}>{children}</h2>
  ) : null;
};

export { TitlePage };
