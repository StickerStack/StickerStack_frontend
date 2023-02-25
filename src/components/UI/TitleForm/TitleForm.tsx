import styles from './TitleForm.module.scss';

interface IProps {
  children: React.ReactNode
}

const TitleForm: React.FC<IProps> = ({ children }: IProps) => {
  return(
    <h2 className={styles.title}>{ children }</h2>
  );
};

export { TitleForm };