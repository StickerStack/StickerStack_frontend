import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import cn from 'classnames';

import { converter } from '../../utils/converter';
import { registerAmount, registerSize } from '../../utils/registersRHF';
import {
  AMOUNT_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  REG_STICKERS,
  SIZE_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
} from '../../utils/constants';
import { TShape } from '../../types/TShape';
import { ButtonCustom, Input, InputError, InputField, RadioButton, TooltipCustom } from '../UI';
import { addpage } from '../../utils/content/stickerspage';
import { InfoBox } from '../InfoBox/InfoBox';
import { useAppDispatch } from '../../hooks/hooks';
import { addStickers, deleteSticker, updateSticker } from '../../store/stickersSlice';
import { Shape } from '../Shape-new/Shape';
import { ISticker } from '../../interfaces/ISticker-new';
import { DragAndDrop } from '../DragAndDrop-new/DragAndDrop';
import styles from './NewSticker.module.scss';

interface IProps {
  sticker: ISticker;
  stickerActiveId: string;
  handleActiveSticker: (id: string) => void;
}

export const NewSticker: FC<IProps> = ({ sticker, stickerActiveId, handleActiveSticker }) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      shape: sticker.shape,
      amount: sticker.amount,
      size:
        sticker.width === sticker.optimal_width && sticker.optimal_height === sticker.optimal_height
          ? 'optimal'
          : 'custom',
      width: sticker.optimal_width,
      height: sticker.optimal_height,
    },
  });
  const [customVisible, setCustomVisible] = useState<boolean>(
    sticker.width === sticker.optimal_width && sticker.height === sticker.optimal_height ? false : true
  );

  const shapesType = {
    circle: 'круг',
    square: 'квадрат',
    rounded_square: 'квадрат с закруглением',
    contour: 'контур',
  };

  const dispatch = useAppDispatch();

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);

    if (
      REG_STICKERS.test(number.toString()) &&
      number <= AMOUNT_INPUT_MAX_LENGTH &&
      number >= AMOUNT_INPUT_MIN_LENGTH
    ) {
      dispatch(updateSticker({ ...sticker, amount: number }));
    }
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shape = event.target.value as TShape;

    if ((shape as TShape) === 'contour') {
      const formData = new FormData();
      formData.append('file', sticker.image);
    }

    dispatch(updateSticker({ ...sticker, shape }));
  };

  const handleDelete = () => {
    dispatch(deleteSticker(sticker.id));
  };

  const handleSubmit = () => {
    dispatch(addStickers([sticker]));
  };

  const sizeValidate = (value: string): boolean => {
    return (
      REG_STICKERS.test(value) &&
      Number(value) >= SIZE_INPUT_MIN_LENGTH &&
      Number(value) <= SIZE_INPUT_MAX_LENGTH
    );
  };

  const onWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('width', value.trim());
    if (sticker.shape === 'circle') {
      setValue('height', value.trim());
    }
    if (sizeValidate(value)) {
      dispatch(
        updateSticker({
          ...sticker,
          width: converter.cmToPx(Number(value)),
          height: sticker.shape === 'circle' ? converter.cmToPx(Number(value)) : sticker.height,
        })
      );
    }
  };

  const onHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('height', value.trim());
    if (sticker.shape === 'circle') {
      setValue('width', value.trim());
    }
    if (sizeValidate(value)) {
      dispatch(
        updateSticker({
          ...sticker,
          height: converter.cmToPx(Number(value)),
          width: sticker.shape === 'circle' ? converter.cmToPx(Number(value)) : sticker.width,
        })
      );
    }
  };

  return (
    <article
      className={sticker.id === stickerActiveId ? styles.card : styles.card_unactive}
      onClick={sticker.id === stickerActiveId ? () => null : () => handleActiveSticker(sticker.id)}
    >
      <form
        className={sticker.id === stickerActiveId ? styles.info : styles.info_unactive}
        onSubmit={handleSubmit}
      >
        <div className={styles.image}>
          {stickerActiveId === sticker.id ? (
            <DragAndDrop sticker={sticker} />
          ) : (
            <img src={`data:image/png;base64,${sticker.image}`} className={styles.image_hidden} />
          )}
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <label className={styles.category} htmlFor='shape'>
            Форма{' '}
            {sticker.id !== stickerActiveId && (
              <span className={styles.shape_hidden}> {shapesType[sticker.shape]}</span>
            )}
          </label>
          <div className={cn(styles.shapes, sticker.id !== stickerActiveId && styles.hidden)}>
            <Shape
              register={register}
              name='shape'
              sticker={sticker}
              value='square'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              sticker={sticker}
              value='rounded_square'
              onShapeChange={onShapeChange}
            />
            <Shape
              register={register}
              name='shape'
              sticker={sticker}
              value='circle'
              onShapeChange={onShapeChange}
            />
          </div>
        </fieldset>
        <fieldset className={styles.flex}>
          <label className={styles.category} htmlFor='amount'>
            Количество стикеров{' '}
            {sticker.id !== stickerActiveId && <span className={styles.size_hidden}>{sticker.amount}шт</span>}
          </label>
          {sticker.id === stickerActiveId && (
            <InputField className='amount'>
              <Input
                className='amount'
                register={register}
                name='amount'
                option={{ ...registerAmount, onChange: onAmountChange }}
              />
              <InputError className='amount' error={errors.amount} />
            </InputField>
          )}
        </fieldset>

        <fieldset className={styles.flex}>
          <p className={styles.category}>
            Размер{' '}
            {sticker.id !== stickerActiveId && (
              <span className={styles.size_hidden}>
                {getValues('width')}x{getValues('height')}см
              </span>
            )}
          </p>
          <div className={cn(styles.options, sticker.id !== stickerActiveId && styles.hidden)}>
            <RadioButton
              register={register}
              name='size'
              value='optimal'
              onClick={() => setCustomVisible(false)}
            >
              Оптимальный размер
              <TooltipCustom text={addpage.tooltipOptimal} />
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
                    name='width'
                    placeholder='ширина'
                    error={errors.width}
                    option={{ ...registerSize, onChange: onWidthChange }}
                  />
                  x
                  <Input
                    type='tel'
                    className='size'
                    register={register}
                    name='height'
                    placeholder='высота'
                    error={errors.height}
                    option={{ ...registerSize, onChange: onHeightChange }}
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
        <ButtonCustom buttonType='submit' type='save' className={styles.save} label='Сохранить' />
      </form>

      <ButtonCustom type='delete' className={styles.delete} label='Удалить' onClick={handleDelete} />
    </article>
  );
};
