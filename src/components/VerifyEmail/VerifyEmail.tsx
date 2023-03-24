import { useAppDispatch } from '../../hooks/hooks';
import { Button, TitleForm, TextForm } from '../UI';
import { setIsOpen } from '../../store/popupSlice';

import styles from './VerifyEmail.module.scss';

const VerifyEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.verify}>
      <TitleForm>Почта подтверждена!</TitleForm>
      <TextForm>Теперь вам доступны загрузка и заказ стикеров.</TextForm>
      <Button onClick={() => dispatch(setIsOpen(true))}>ОК</Button>
    </div>
  );
};

export { VerifyEmail };
