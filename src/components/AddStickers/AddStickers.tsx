import { useAppDispatch } from '../../hooks/hooks';
import { ButtonCustom, ButtonWithText, TitlePage } from '../UI';
import { ImagePick } from '../index';
import { setIsOpen } from '../../store/popupSlice';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <div className={styles.card}>
        <ImagePick />
        <form className={styles.info}>
          <div className={styles.flex}>
            <p className={styles.category}>Форма</p>
            <div className={styles.shapes}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}></div>
                <span className={styles.shape_title}>Квадрат</span>
              </div>
              <div className={styles.shape}>
                <div className={styles.shape_pic}></div>
                <span className={styles.shape_title}>Закругленный квадрат</span>
              </div>
              <div className={styles.shape}>
                <div className={styles.shape_pic}></div>
                <span className={styles.shape_title}>Круг</span>
              </div>
              <div className={styles.shape}>
                <div className={styles.shape_pic}></div>
                <span className={styles.shape_title}>По контуру</span>
              </div>
            </div>
          </div>
          <div className={styles.flex}>
            <p className={styles.category}>Количество стикеров</p>
            <input className={styles.quantity_input} />
          </div>
          <div className={styles.flex}>
            <p className={styles.category}>Размер</p>
            <div className={styles.options}>
              <label className={styles.text}>
                <input type='radio' />
                Оптимальный размер
              </label>

              <label className={styles.text}>
                <input type='radio' />
                Свой размер
              </label>
            </div>
          </div>
          <div className={styles.flex}>
            <p className={styles.category}>Цвет фона</p>
            <label className={styles.text}>
              белый
              <input type='checkbox' />
            </label>
          </div>
          <div className={styles.flex}>
            <p className={styles.category}>Материал</p>
            <p className={styles.text}>винил</p>
          </div>
        </form>

        <ButtonCustom type='delete' />
      </div>
    </div>
  );
};

export { AddStickers };
