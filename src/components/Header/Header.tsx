import { NavLink, Link } from 'react-router-dom';

import styles from './Header.module.scss';

interface IProps {
  isLogged: boolean,
  onClickSignin: () => void,
}

const Header: React.FC<IProps> = ({ isLogged, onClickSignin }: IProps) => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Лого
      </Link>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink className={styles.link} to='/'>
              Как это работает?
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to='/'>
              Наши работы
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to='/'>
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to='/'>
              Отзывы
            </NavLink>
          </li>
        </ul>
      </nav>
      {isLogged ? (
        <Link to='/' className={styles.profile} />
      ) : (
        <button className={styles.signin} onClick={onClickSignin}>Войти</button>
      )}
    </header>
  );
};

export { Header };
