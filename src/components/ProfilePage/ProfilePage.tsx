import { useSelector } from "react-redux";

import { Button, TitleForm } from "../UI";

import { useAppDispatch } from "../../hooks/hooks";
import { IUserState } from "../../interfaces/IUserState";
import { logOut } from "../../store/userSlice";
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const email = useSelector((state: { user: IUserState }) => state.user.email)

  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  }

  return(
    <main className={styles.profile}>
      <TitleForm>Почта: {email}</TitleForm>
      <Button onClick={() => onLogOut()}>Выйти</Button>
    </main>
  )
};

export { ProfilePage };