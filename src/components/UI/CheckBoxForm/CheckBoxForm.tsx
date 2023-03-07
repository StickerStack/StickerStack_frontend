import styles from './CheckBoxForm.module.scss';

interface IProps { 
  children: React.ReactNode
  name: string;
  register: any;
  error?: boolean;
}

const CheckBoxForm: React.FC<IProps> = ({ register, children, name, error }: IProps) => {
  return (
    <div className={styles.container}>
      <div>
        <input className={styles.input} {...register} id={name} type='checkbox' />
        <label className={error ? styles.label_error : styles.label} htmlFor={name} />
      </div>
      {children}
    </div>
  );
};

export { CheckBoxForm };
