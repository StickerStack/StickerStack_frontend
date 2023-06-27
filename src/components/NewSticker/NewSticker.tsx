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
import { DragAndDrop } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard, removeBackground, updateCard } from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';
import { registerAmount, registerSize } from '../../utils/registersRHF';
import { AMOUNT_INPUT_MAX_LENGTH, AMOUNT_INPUT_MIN_LENGTH } from '../../utils/constants';

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
  const [cardShape, setCardShape] = useState<TCardShape>('square');
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const [amount, setAmount] = useState<number>(card.amount);
  const copyCard = { ...card };

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: { size: 'optimal' },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    setAmount(number);
    copyCard.amount = number;

    if (number <= AMOUNT_INPUT_MAX_LENGTH && number >= AMOUNT_INPUT_MIN_LENGTH) {
      dispatch(updateCard({ id: card.id, updatedCard: copyCard }));
    }
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardShape(event.target.value as TCardShape);
    copyCard.shape = event.target.value as TCardShape;

    if ((event.target.value as TCardShape) === 'contour') {
      const formData = new FormData();
      formData.append('file', card.image);
      dispatch(removeBackground({ data: formData, id: card.id }));
    }
    dispatch(updateCard({ id: card.id, updatedCard: copyCard }));
  };

  return (
    <section className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop card={card} />
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <p className={styles.category}>Форма</p>
          <div className={styles.shapes}>
            <input
              className={styles.radio}
              type='radio'
              id={`${card.id}-shape-square`}
              name={`${card.id}-shape`}
              value='square'
              checked={cardShape === 'square'}
              onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-square`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <RectSvg />
                </div>
                <span className={styles.shape_title}>Квадрат</span>
              </div>
            </label>

            <input
              className={styles.radio}
              type='radio'
              id={`${card.id}-shape-rounded-square`}
              name={`${card.id}-shape`}
              value='rounded-square'
              checked={cardShape === 'rounded-square'}
              onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-rounded-square`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <RectRondedSvg />
                </div>
                <span className={styles.shape_title}>Закругленный квадрат</span>
              </div>
            </label>

            <input
              className={styles.radio}
              type='radio'
              id={`${card.id}-shape-circle`}
              name={`${card.id}-shape`}
              value='circle'
              checked={cardShape === 'circle'}
              onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-circle`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <CircleSvg />
                </div>
                <span className={styles.shape_title}>Круг</span>
              </div>
            </label>

            <input
              className={styles.radio}
              type='radio'
              id={`${card.id}-shape-contour`}
              name={`${card.id}-shape`}
              value='contour'
              checked={cardShape === 'contour'}
              onChange={onShapeChange}
            />
            <label className={styles.label} htmlFor={`${card.id}-shape-contour`}>
              <div className={styles.shape}>
                <div className={styles.shape_pic}>
                  <ContourSvg />
                </div>
                <span className={styles.shape_title}>По контуру</span>
              </div>
            </label>
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
      {cards.length > 1 ? (
        <ButtonCustom
          type='delete'
          className={styles.delete}
          label='Удалить'
          onClick={handleDelete}
        />
      ) : null}
    </section>
  );
};

export { NewSticker };
