import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import cn from 'classnames';

import { registerAmount } from '../../utils/registersRHF';
import { AMOUNT_INPUT_MAX_LENGTH, AMOUNT_INPUT_MIN_LENGTH, REG_STICKERS } from '../../utils/constants';
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
}

export const NewSticker: FC<IProps> = ({ sticker }) => {
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
    sticker.width === sticker.optimal_width && sticker.height === sticker.optimal_height
      ? false
      : true,
  );

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

  return (
    <article className={styles.card}>
      <form className={styles.info} onSubmit={handleSubmit}>
        <div className={styles.image}>
          <DragAndDrop sticker={sticker} />
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <label className={styles.category} htmlFor='shape'>
            Форма
          </label>
          <div className={styles.shapes}>
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
            Количество стикеров
          </label>
          <InputField className='amount'>
            <Input
              className='amount'
              register={register}
              name='amount'
              option={{ ...registerAmount, onChange: onAmountChange }}
            />
            <InputError className='amount' error={errors.amount} />
          </InputField>
        </fieldset>

        <fieldset className={styles.flex}>
          <p className={styles.category}>Размер</p>
          <div className={styles.options}>
            <RadioButton register={register} name='size' value='optimal'>
              Оптимальный размер
              <TooltipCustom text={addpage.tooltipOptimal} />
            </RadioButton>
            <div className={styles.option}>
              <RadioButton register={register} name='size' value='custom' className={styles.size}>
                Свой размер
              </RadioButton>
              <div>
                <InputField className='size'>
                  <Input
                    type='tel'
                    className='size'
                    register={register}
                    name='width'
                    placeholder='ширина'
                    error={errors.width}
                  />
                  x
                  <Input
                    type='tel'
                    className='size'
                    register={register}
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
        <ButtonCustom
          buttonType='submit'
          type='save'
          className={styles.save}
          label='Сохранить'
        />
      </form>

      <ButtonCustom type='delete' className={styles.delete} label='Удалить' onClick={handleDelete} />
    </article>
  );
};
