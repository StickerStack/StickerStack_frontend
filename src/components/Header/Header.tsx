import { Link } from 'react-router-dom';

import { Button } from '../UI/Button';

import styles from './Header.module.scss';

interface IProps {
  isLogged: boolean;
  onClickSignin: () => void;
  onClickLogout: () => void;
}

const Header: React.FC<IProps> = ({
  isLogged,
  onClickSignin,
  onClickLogout,
}: IProps) => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Лого
      </Link>
      {isLogged ? (
        <Link onClick={onClickLogout} to='/' className={styles.profile} />
      ) : (
        <Button onClick={onClickSignin}>Войти</Button>
      )}
    </header>
  );
};

export { Header };
