import { useAppDispatch } from '../../hooks/hooks';
import { ButtonCustom, ButtonWithText, TextUnderline, TitlePage } from '../UI';
import { NewSticker } from '../index';
import { setIsOpen, setPreviewIsOpen } from '../../store/popupSlice';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <NewSticker />
      <TextUnderline type='button' onClick={() => dispatch(setPreviewIsOpen(true))}>
        Предпросмотр страницы
      </TextUnderline>
    </div>
  );
};

export { AddStickers };
