import styles from './ButtonSubmit.module.scss';

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonSubmit: React.FC<IProps> = ({ children, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick} type='submit'>
      {children}
    </button>
  );
};

export { ButtonSubmit };
