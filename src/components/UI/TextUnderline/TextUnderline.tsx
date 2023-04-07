import { Link } from 'react-router-dom';
import styles from './TextUnderline.module.scss';

export type TextType = 'button' | 'link';

interface IProps {
  children: React.ReactNode;
  type?: TextType;
  onClick?: () => void;
}

const TextUnderline: React.FC<IProps> = ({ children, type, onClick }: IProps) => {
  return type === 'button' ? (
    <button type='button' onClick={onClick} className={styles.button}>
      <span className={styles.text}>{children}</span>
    </button>
  ) : type === 'link' ? (
    // TODO: добработать ссылку, когда появится
    <Link to=''>{children}</Link>
  ) : null;
};

export { TextUnderline };
