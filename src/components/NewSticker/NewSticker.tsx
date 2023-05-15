import cn from 'classnames';
import { ButtonCustom } from '../UI';
import {DragAndDrop} from '../';

import rect from '../../images/icons/rect.svg';
import rect_ronded from '../../images/icons/rect_rounded.svg';
import circle from '../../images/icons/circle.svg';
import contour from '../../images/icons/contour.svg';
import styles from './NewSticker.module.scss';

const NewSticker: React.FC = () => {
  return (
    <div className={styles.card}>
      <form className={styles.info}>
        <DragAndDrop />
        <div className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <div className={styles.shapes}>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <img src={rect} />
              </div>
              <span className={styles.shape_title}>Квадрат</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <img src={rect_ronded} />
              </div>
              <span className={styles.shape_title}>Закругленный квадрат</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <img src={circle} />
              </div>
              <span className={styles.shape_title}>Круг</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <img src={contour} />
              </div>
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
      <ButtonCustom type='delete' className={styles.delete} label='Удалить' />
    </div>
  );
};

export { NewSticker };
