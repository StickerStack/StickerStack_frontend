import { useAppDispatch } from '../../hooks/hooks';
import { RadioButton, TextUnderline, TitlePage } from '../UI';
import { NewSticker } from '../index';
import { setPreviewIsOpen } from '../../store/popupSlice';
import { pages, pagePrice } from '../../utils/constants';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();

  const fullPrice = pagePrice * pages.length;
  const itemPrice = (pagePrice * pages.length) / (pages.length * 35);

  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <NewSticker />
      <div className={styles.info}>
        <div className={styles.info_pages}>
          <div className={styles.flex}>
            <span className={styles.text}>Количество листов А4</span>
            <span className={styles.amount}>{pages.length}</span>
          </div>
          <TextUnderline
            type='button'
            className={styles.preview}
            onClick={() => dispatch(setPreviewIsOpen(true))}
          >
            Предпросмотр страницы
          </TextUnderline>
        </div>

        <div className={styles.flex}>
          <span className={styles.text}>Стоимость</span>
          <div className={styles.prices}>
            <span className={styles.price}>{fullPrice} ₽</span>
            <span className={styles.price_small}>{itemPrice}₽/ за шт</span>
          </div>
        </div>
        <div className={styles.options}>
          <RadioButton name='cut-stickers' value='false'>
            Оставить стикеры на листе
          </RadioButton>
          <RadioButton name='cut-stickers' value='true'>
            Вырезать стикеры по контуру
          </RadioButton>
        </div>
      </div>
    </div>
  );
};

export { AddStickers };
