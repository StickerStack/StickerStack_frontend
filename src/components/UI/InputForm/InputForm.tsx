import { Link } from 'react-router-dom';
import styles from './InputForm.module.scss';

interface IProps {
  name: string;
  label: string;
  type?: string;
  optionalLink?: { to: string; text: string };
}

const InputForm: React.FC<IProps> = ({
  name,
  label,
  type='text',
  optionalLink,
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
        <input type={type} id={name} className={styles.field} />
      </div>
    </div>
  );
};

export { InputForm };
