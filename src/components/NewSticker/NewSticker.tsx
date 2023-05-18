import { useState } from 'react';
import cn from 'classnames';
import { ButtonCustom, RadioButton, TooltipCustom } from '../UI';
import {DragAndDrop} from '../';

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';
import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';

const NewSticker: React.FC = () => {
  const [customVisible, setCustomVisible] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      <form className={styles.info}>
        <DragAndDrop />
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <div className={styles.shapes}>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <RectSvg />
              </div>
              <span className={styles.shape_title}>Квадрат</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <RectRondedSvg />
              </div>
              <span className={styles.shape_title}>Закругленный квадрат</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <CircleSvg />
              </div>
              <span className={styles.shape_title}>Круг</span>
            </div>
            <div className={styles.shape}>
              <div className={styles.shape_pic}>
                <ContourSvg />
              </div>
              <span className={styles.shape_title}>По контуру</span>
            </div>
          </div>
        </fieldset>
        <div className={styles.flex}>
          <p className={styles.category}>Количество стикеров</p>
          <input className={cn(styles.input, styles.quantity_input)} />
        </div>
        <fieldset className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <div className={styles.options}>
            <RadioButton name='size' value='optimal' onClick={() => setCustomVisible(false)}>
              Оптимальный размер
              <TooltipCustom text={tooltipText} />
            </RadioButton>
            <RadioButton name='size' value='custom' onClick={() => setCustomVisible(true)}>
              Свой размер
              <input
                className={cn(
                  styles.input,
                  styles.size_input,
                  customVisible ? styles.visible : styles.hidden,
                )}
                placeholder='5*5'
              />
              <span className={cn(customVisible ? styles.visible : styles.hidden)}>см</span>
            </RadioButton>
          </div>
        </fieldset>
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
