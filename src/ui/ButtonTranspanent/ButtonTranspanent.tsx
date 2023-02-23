import styles from './ButtonTranspanent.module.scss';

interface IProps {
  children: React.ReactNode,
  onClick: () => void
}

const ButtonTranspanent: React.FC<IProps> = ({ children, onClick }: IProps) => {
  return(
    <button className={styles.button} onClick={onClick}>{children}</button>
  );
};

export { ButtonTranspanent };