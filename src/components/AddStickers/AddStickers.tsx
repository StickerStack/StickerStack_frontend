import { useAppDispatch } from '../../hooks/hooks';
import { ButtonSubmit, TitleForm, TextForm } from '../UI';
import { setIsOpen } from '../../store/popupSlice';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  return (
    <div className={styles.container}>
      <TitleForm>Загрузка стикеров</TitleForm>
      <TextForm>Здесь будет функционал загрузки стикеров :3</TextForm>
    </div>
  );
};

export { AddStickers };
