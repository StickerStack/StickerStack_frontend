import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
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
  );
};

export { Navigation };
