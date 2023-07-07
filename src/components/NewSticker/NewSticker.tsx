import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  ButtonCustom,
  Error,
  Input,
  RadioButton,
  TooltipCustom,
  InputField,
  InputError,
} from '../UI';
import { Shape } from '../Shape/Shape';
import { DragAndDrop } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import {
  deleteCard,
  removeBackground,
  setActive,
  updateAmount,
  updateShape,
} from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';
import { registerAmount, registerSize } from '../../utils/registersRHF';

import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';
import { addItem } from '../../store/cartSlice';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import {
  AMOUNT_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  REG_STICKERS,
} from '../../utils/constants';

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

  useEffect(() => {
    if (card.active) {
      dispatch(setActive(card.id));
    }
  }, [card.active, card.id]);

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: { shape: card.shape, amount: card.amount, size: 'optimal' },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);

    if (
      REG_STICKERS.test(number.toString()) &&
      number <= AMOUNT_INPUT_MAX_LENGTH &&
      number >= AMOUNT_INPUT_MIN_LENGTH
    ) {
      dispatch(updateAmount({ id: card.id, amount: number }));
    }
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shape = event.target.value as TCardShape;

    if ((shape as TCardShape) === 'contour') {
      const formData = new FormData();
      formData.append('file', card.image);
      dispatch(removeBackground({ data: formData, id: card.id }));
    }
    dispatch(updateShape({ id: card.id, shape: shape }));
  };

  return (
    <section className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop
            card={card}
            onLoad={() => {
              dispatch(
                addItem({
                  image: card.image,
                  shape: card.shape,
                  amount: card.amount,
                  size: { width: card.size.width, height: card.size.height },
                  id: generateRandomNumber(),
                }),
              );
            }}
          />
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <div className={styles.shapes}>
            <Shape
              register={register}
              name='shape'
              card={card}
              value='square'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              card={card}
              value='rounded-square'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              card={card}
              value='circle'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              card={card}
              value='contour'
              onShapeChange={onShapeChange}
            />
          </div>
        </fieldset>
        <div>
          <div className={styles.flex}>
            <label className={styles.category} htmlFor='amount' onClick={() => console.log(errors)}>
              Количество стикеров
            </label>
            <div>
              <Input
                className='amount'
                register={register}
                option={{
                  ...registerAmount,
                  onChange: (e) => {
                    handleAmountChange(e);
                  },
                }}
                name='amount'
              />
              <Error className={styles.error}>{errors.amount && `${errors.amount?.message}`}</Error>
            </div>
          </div>
        </div>
        <fieldset className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <div className={styles.options}>
            <RadioButton
              register={register}
              name='size'
              value='optimal'
              onClick={() => setCustomVisible(false)}
            >
              Оптимальный размер
              <TooltipCustom text={tooltipText} />
            </RadioButton>
            <div className={styles.option}>
              <RadioButton
                register={register}
                name='size'
                value='custom'
                className={styles.size}
                onClick={() => setCustomVisible(true)}
              >
                Свой размер
              </RadioButton>
              <div className={cn(customVisible ? styles.visible : styles.hidden)}>
                <InputField className='size'>
                  <Input
                    type='tel'
                    className='size'
                    register={register}
                    option={registerSize}
                    name='width'
                    placeholder='ширина'
                    error={errors.width}
                  />
                  x
                  <Input
                    type='tel'
                    className='size'
                    register={register}
                    option={registerSize}
                    name='height'
                    placeholder='высота'
                    error={errors.height}
                  />
                  см
                  <InputError className='size' error={errors.width || errors.height} />
                </InputField>
              </div>
            </div>
          </div>
        </fieldset>

        <div className={styles.flex}>
          <p className={styles.category}>Цвет фона</p>
          <label className={styles.text}>белый</label>
          <div className={styles.color_sample} />
        </div>
        <div className={styles.flex}>
          <p className={styles.category}>Материал</p>
          <p className={styles.text}>винил</p>
        </div>
      </form>
      {cards.length > 1 && (
        <ButtonCustom
          type='delete'
          className={styles.delete}
          label='Удалить'
          onClick={handleDelete}
        />
      )}
    </section>
  );
};

export { NewSticker };
