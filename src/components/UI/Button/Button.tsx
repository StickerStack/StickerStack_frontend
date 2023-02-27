import styles from './Button.module.scss';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ children, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
