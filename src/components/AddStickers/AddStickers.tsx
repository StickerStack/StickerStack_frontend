import { useAppDispatch } from '../../hooks/hooks';
import { ButtonCustom, ButtonWithText, TitlePage } from '../UI';
import { NewSticker } from '../index';
import { setIsOpen } from '../../store/popupSlice';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <NewSticker />
    </div>
  );
};

export { AddStickers };
