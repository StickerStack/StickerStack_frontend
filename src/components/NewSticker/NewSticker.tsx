import { useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import { ButtonCustom, CheckBoxForm, RadioButton, TooltipCustom } from '../UI';
import { DragAndDrop } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard } from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';
import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';

interface IProps {
  card: ICard;
}

const NewSticker: React.FC<IProps> = ({ card }: IProps) => {
  const dispatch = useAppDispatch();
  const [customVisible, setCustomVisible] = useState<boolean>(false);
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  return (
    <div className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop card={card} />
        </div>

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
          <p className={styles.category} onClick={() => console.log(errors)}>
            Количество стикеров
          </p>
          <input
            type='tel'
            className={cn(styles.input, styles.quantity_input)}
            {...register('amount', {
              value: 1,
              required: 'Введите количество стикеров',
              min: {
                value: 1,
                message: 'Минимальное количество - 1',
              },
              max: {
                value: 100,
                message: 'Максимальное количество - 100',
              },
              pattern: {
                value: /^[1-9][0-9]?$|^100$/,
                message: 'Укажите корректное количество',
              },
            })}
          />
          <span className={styles.error}>{errors.amount && `${errors.amount?.message}`}</span>
        </div>
        <fieldset className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <div className={styles.options}>
            <RadioButton name='size' value='optimal' onClick={() => setCustomVisible(false)}>
              Оптимальный размер
              <TooltipCustom text={tooltipText} />
            </RadioButton>
            <RadioButton
              name='size'
              value='custom'
              className={styles.size}
              onClick={() => setCustomVisible(true)}
            >
              Свой размер
              <div className={cn(customVisible ? styles.visible : styles.hidden)}>
                <input
                  placeholder='ширина'
                  type='tel'
                  className={cn(styles.input, styles.size_input)}
                  {...register('width', {
                    required: 'Введите размеры',
                    min: {
                      value: 1,
                      message: 'Минимальный размер - 1 см',
                    },
                    max: {
                      value: 100,
                      message: 'Максимальный размер - 25 см',
                    },
                    pattern: {
                      value: /^[1-9][0-9]?$|^100$/,
                      message: 'Укажите корректные размеры',
                    },
                  })}
                />{' '}
                x{' '}
                <input
                  className={cn(styles.input, styles.size_input)}
                  placeholder='высота'
                  type='tel'
                  {...register('height', {
                    required: 'Введите размеры',
                    min: {
                      value: 1,
                      message: 'Минимальный размер - 1 см',
                    },
                    max: {
                      value: 100,
                      message: 'Максимальный размер - 25 см',
                    },
                    pattern: {
                      value: /^[1-9][0-9]?$|^100$/,
                      message: 'Укажите корректные размеры',
                    },
                  })}
                />
                <span className={cn(customVisible ? styles.visible : styles.hidden)}> см</span>
                <span className={styles.error}>
                  {(errors.width || errors.height) && `${errors.width?.message}`}
                </span>
              </div>
            </RadioButton>
          </div>
        </fieldset>
        <div className={styles.flex}>
          <p className={styles.category}>Цвет фона</p>
          <label className={styles.text}>
            белый
            <CheckBoxForm
              name='colorCheckbox'
              register={register}
              option={{ required: 'Обязательное поле' }}
              error={errors?.confirmCheckbox}
            />
          </label>
        </div>
        <div className={styles.flex}>
          <p className={styles.category}>Материал</p>
          <p className={styles.text}>винил</p>
        </div>
      </form>
      {cards.length > 1 ? (
        <ButtonCustom
          type='delete'
          className={styles.delete}
          label='Удалить'
          onClick={handleDelete}
        />
      ) : null}
    </div>
  );
};

export { NewSticker };
