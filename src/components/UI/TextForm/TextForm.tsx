import styles from './TextForm.module.scss';

interface IProps {
  children: React.ReactNode;
}

const TextForm: React.FC<IProps> = ({ children }: IProps) => {
  return <p className={styles.textform}>{children}</p>;
};

export { TextForm };
