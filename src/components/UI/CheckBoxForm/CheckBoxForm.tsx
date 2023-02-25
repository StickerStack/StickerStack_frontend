import styles from './CheckBoxForm.module.scss';

interface IProps {
  label: string;
}

const CheckBoxForm: React.FC<IProps> = ({ label }: IProps) => {
  return(
    <label className={styles.label}>
      <input className={styles.checkbox} type='checkbox' />
      {label}
    </label>
  );
};

export { CheckBoxForm };