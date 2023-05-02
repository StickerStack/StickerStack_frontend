
import { Link, useNavigate } from 'react-router-dom';
import { ButtonWithText } from '../UI';
import styles from './ProfileMenu.module.scss';
import { logOut } from '../../store/authSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { IUserState } from '../../interfaces';

const ProfileMenu: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { firstName, lastName } = useSelector((state: { user: IUserState }) => state.user);

    const onLogOut = () => {
        dispatch(logOut())
    };

    return (
        <div className={styles.menu}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                </div>
                <Link to='/profile' className={styles.prfile_link}>
                    <div className={styles.name}>
                        {`${lastName} ${firstName}`}
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
