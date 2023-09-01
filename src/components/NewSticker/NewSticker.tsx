import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { ButtonCustom, Input, RadioButton, TooltipCustom, InputField, InputError } from '../UI';
import { Shape } from '../Shape/Shape';
import { DragAndDrop } from '../';
import { InfoBox } from '../InfoBox/InfoBox';
import { useAppDispatch } from '../../hooks/hooks';
import {
  checkValidation,
  deleteCard,
  removeBackground,
  setActive,
  setValid,
  updateAmount,
  updateShape,
  updateSize,
} from '../../store/cardsSlice';
import { CartState, ICard, ICardsState } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';
import { registerAmount, registerSize } from '../../utils/registersRHF';
import { addItem, addSticker, deleteItem, deleteSticker, updateItem } from '../../store/cartSlice';
import {
  AMOUNT_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  REG_STICKERS,
  SIZE_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
} from '../../utils/constants';
import { converter } from '../../utils/converter';

import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';

interface IProps {
  card: ICard;
}

const sizeValidate = (value: string): boolean => {
  return (
    REG_STICKERS.test(value) &&
    Number(value) >= SIZE_INPUT_MIN_LENGTH &&
    Number(value) <= SIZE_INPUT_MAX_LENGTH
  );
};

const NewSticker: React.FC<IProps> = ({ card }: IProps) => {
  const dispatch = useAppDispatch();
  const [customVisible, setCustomVisible] = useState<boolean>(
    card.size.width === card.optimalSize.width && card.size.height === card.optimalSize.height
      ? false
      : true,
  );

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
    if (cart.items.length !== 0 && typeof card.id === 'string') {
      dispatch(deleteSticker(card.id));
    }
  };

  useEffect(() => {
    if (card.active) {
      dispatch(setActive(card.id));
    }
    // eslint-disable-next-line
  }, [card.active, card.id]);

  const {
    register,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      shape: card.shape,
      amount: card.amount,
      size:
        card.size.width === card.optimalSize.width && card.size.height === card.optimalSize.height
          ? 'optimal'
          : 'custom',
      width: card.size.width,
      height: card.size.height,
    },
  });
  const watchAllFields = watch();

  useEffect(() => {
    if (isValid && card.image) {
      dispatch(setValid({ id: card.id, valid: true }));
      dispatch(checkValidation());
    } else dispatch(setValid({ id: card.id, valid: false }));
    dispatch(checkValidation());
    //  watchAllFields && cart.items.length !== 0 && dispatch(updateItem(card));
    // eslint-disable-next-line
  }, [isValid, watchAllFields]);

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
      //  dispatch(removeBackground({ data: formData, id: card.id }));
    }
    dispatch(updateShape({ id: card.id, shape: shape }));
  };

  const onWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('width', value.trim());
    if (card.shape === 'circle') {
      setValue('height', value.trim());
    }
    if (sizeValidate(value)) {
      dispatch(
        updateSize({
          id: card.id,
          width: converter.cmToPx(Number(value)),
          height: card.shape === 'circle' ? converter.cmToPx(Number(value)) : card.size.height,
        }),
      );
    }
  };

  const onHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('height', value.trim());
    if (card.shape === 'circle') {
      setValue('width', value.trim());
    }
    if (sizeValidate(value)) {
      dispatch(
        updateSize({
          id: card.id,
          height: converter.cmToPx(Number(value)),
          width: card.shape === 'circle' ? converter.cmToPx(Number(value)) : card.size.width,
        }),
      );
    }
  };

  // При редактировании своего размера

  useEffect(() => {
    const widthValue = getValues('width');
    const heightValue = getValues('height');
    if (customVisible) {
      if (card.shape === 'circle') {
        if (heightValue > widthValue) {
          setValue('height', widthValue);
          if (sizeValidate(widthValue)) {
            dispatch(
              updateSize({
                id: card.id,
                height: converter.cmToPx(Number(widthValue)),
                width: converter.cmToPx(Number(widthValue)),
              }),
            );
          }
        }
        if (widthValue > heightValue) {
          setValue('width', heightValue);
          if (sizeValidate(heightValue)) {
            dispatch(
              updateSize({
                id: card.id,
                height: converter.cmToPx(Number(heightValue)),
                width: converter.cmToPx(Number(heightValue)),
              }),
            );
          }
        }
      } else setValue('width', Math.round(converter.pxToCm(card.size.width)));
      setValue('height', Math.round(converter.pxToCm(card.size.height)));
    }

    // eslint-disable-next-line
  }, [card.shape, customVisible]);

  // При оптимальном размере

  useEffect(() => {
    if (!customVisible) {
      if (card.shape === 'circle') {
        if (card.optimalSize.height > card.optimalSize.width) {
          setValue('width', Math.round(converter.pxToCm(card.optimalSize.width)));
          setValue('height', Math.round(converter.pxToCm(card.optimalSize.width)));
          dispatch(
            updateSize({
              id: card.id,
              height: card.optimalSize.width,
              width: card.optimalSize.width,
            }),
          );
        }
        if (card.optimalSize.width > card.optimalSize.height) {
          setValue('width', Math.round(converter.pxToCm(card.optimalSize.height)));
          setValue('height', Math.round(converter.pxToCm(card.optimalSize.height)));
          dispatch(
            updateSize({
              id: card.id,
              height: card.optimalSize.height,
              width: card.optimalSize.height,
            }),
          );
        }
      } else setValue('width', Math.round(converter.pxToCm(card.optimalSize.width)));
      setValue('height', Math.round(converter.pxToCm(card.optimalSize.height)));
      dispatch(
        updateSize({
          id: card.id,
          height: card.optimalSize.height,
          width: card.optimalSize.width,
        }),
      );
    }

    // eslint-disable-next-line
  }, [card.shape, card.image, customVisible]);

  return (
    <section className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop register={register} name='dnd' card={card} />
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <label className={styles.category} htmlFor='shape'>
            Форма
          </label>
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
              value='rounded_square'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              card={card}
              value='circle'
              onShapeChange={onShapeChange}
            />
            {/* <Shape
              register={register}
              name='shape'
              card={card}
              value='contour'
              onShapeChange={onShapeChange}
            /> */}
          </div>
        </fieldset>
        <fieldset className={styles.flex}>
          <label className={styles.category} htmlFor='amount'>
            Количество стикеров
          </label>
          <InputField className='amount'>
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
              error={errors.amount}
            />
            <InputError className='amount' error={errors.amount} />
          </InputField>
        </fieldset>

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
                    option={{
                      ...registerSize,
                      onChange: onWidthChange,
                    }}
                    name='width'
                    placeholder='ширина'
                    error={errors.width}
                  />
                  x
                  <Input
                    type='tel'
                    className='size'
                    register={register}
                    option={{
                      ...registerSize,
                      onChange: onHeightChange,
                    }}
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
          <InfoBox type='simple' description='Цвет фона'>
            <div className={styles.flexible}>
              белый
              <div className={styles.color_sample} />
            </div>
          </InfoBox>
        </div>
        <div className={styles.flex}>
          <InfoBox type='simple' description='Материал'>
            винил
          </InfoBox>
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
