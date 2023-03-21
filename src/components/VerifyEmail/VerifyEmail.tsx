import { Button, TitleForm, TextForm } from '../UI';

import styles from './VerifyEmail.module.scss';

const VerifyEmail: React.FC = () => {
  return (
    <div className={styles.verify}>
      <TitleForm>Почта подтверждена!</TitleForm>
      <TextForm>Теперь вам доступны загрузка и заказ стикеров.</TextForm>
      <Button>ОК</Button>
    </div>
  ); // По кнопке открытие авторизации/редирект на главную со входом,
  // либо на профиль, если вход будет автоматическим после регистрации и захода на подтверждение
};

export { VerifyEmail };
