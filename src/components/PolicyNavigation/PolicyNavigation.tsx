import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { PRIVACY, TERMS } from '../../utils/constants';

import styles from './PolicyNavigation.module.scss';

const PolicyNavigation = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.navigation}>
        <li>
          <NavLink
            className={cn(styles.link, location.pathname === PRIVACY && styles.link_active)}
            to={PRIVACY}
          >
            Политика конфиденциальности
          </NavLink>
        </li>
        <li>
          <NavLink
            className={cn(styles.link, location.pathname === TERMS && styles.link_active)}
            to={TERMS}
          >
            Условия использования
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export { PolicyNavigation };
