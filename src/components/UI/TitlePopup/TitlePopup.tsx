import styles from './TitlePopup.module.scss';

interface IProps {
  children: React.ReactNode;
}

const TitlePopup: React.FC<IProps> = ({ children }: IProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export { TitlePopup };
