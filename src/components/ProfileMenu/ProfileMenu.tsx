
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { ButtonWithText } from '../UI';
import styles from './ProfileMenu.module.scss';

const ProfileMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogOut = () => {
        console.log('logout');

    };

    return (
        <div className={styles.menu}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                </div>
                <Link to='/profile' className={styles.prfile_link}>
                    <div className={styles.name}>
                        Иванов Иван
                    </div>
                </ Link>
            </div>
            <div className={styles.button_container}>
                <ButtonWithText className={styles.button} onClick={() => navigate('/add-stickers')}>
                    Заказать стикеры
                </ButtonWithText>
            </div>
            <ul className={styles.list}>
                {/* <li>Заказы</li> */}
                {/* <li>Служба поддержки</li> */}
                <li onClick={() => onLogOut()}>Выход</li>
            </ul>
        </div>)
}

export { ProfileMenu };
