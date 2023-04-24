import cn from 'classnames';
import styles from './TitlePage.module.scss';
import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const TitlePage: React.FC<IProps> = ({ children, className }: IProps) => {
  return <h1 className={cn(styles.title, className)}>{children}</h1>;
};

export { TitlePage };