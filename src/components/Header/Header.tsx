import { NavLink, Link } from 'react-router-dom';

import { Button } from '../UI/Button';

import styles from './Header.module.scss';

interface IProps {
  isLogged: boolean;
  onClickSignin: () => void;
  onClickLogout: () => void;
}

const Header: React.FC<IProps> = ({ isLogged, onClickSignin, onClickLogout }: IProps) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Лого
      </Link>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink className={styles.link} to="/">
              Как это работает?
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/">
              Наши работы
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/">
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/">
              Отзывы
            </NavLink>
          </li>
        </ul>
      </nav>
      {isLogged ? (
        <Link onClick={onClickLogout} to="/" className={styles.profile} />
      ) : (
        <Button onClick={onClickSignin}>Войти</Button>
      )}
    </header>
  );
};

export { Header };
