import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../UI';

import { useAppDispatch } from '../../hooks/hooks';
import { IUserState } from '../../interfaces';
import styles from './Header.module.scss';
import { setIsOpen } from '../../store/popupSlice';


const Header: React.FC = () => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged)

  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Лого
      </Link>
      {isLogged ? (
        <Link to='/profile' className={styles.profile} />
      ) : (
        <Button onClick={() => dispatch(setIsOpen(true))}>Войти</Button>
      )}
    </header>
  );
};

export { Header };
