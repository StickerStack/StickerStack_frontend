import { Link } from 'react-router-dom';
import styles from './InputForm.module.scss';

interface IProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  optionalLink?: { to: string; text: string };
  error?: string;
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type='text',
  optionalLink,
  placeholder,
  error
}: IProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {optionalLink && (
          <Link className={styles.link} to={optionalLink.to}>
            {optionalLink.text}
          </Link>
        )}
      </label>
      <div className={styles.border}>
        <input placeholder={placeholder} type={type} id={name} className={styles.field} />
      </div>
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export { InputForm };
