import { FC, useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import cn from 'classnames';

import { registerAmount, registerSize } from '@utils/registersRHF';
import {
  AMOUNT_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  REG_STICKERS,
  SIZE_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
} from '@utils/constants';
import { TShape } from '@shared/types';
import { useAppDispatch } from '@shared/hooks/hooks';
import { ISticker } from '@shared/interfaces';
import {
  addEmptySticker,
  addSticker,
  addStickers,
  deleteSticker,
  putStickerInCart,
  updateSticker,
  openMessage,
} from '@shared/store';
import {
  ButtonCustom,
  Input,
  InputError,
  InputField,
  RadioButton,
  TooltipCustom,
  Loader,
} from '@components/UI';
import { InfoBox, Shape, StickerImage, DragAndDrop } from '@components/index';

import { messages } from '@static/popups';
import { addpage } from '@static/stickerspage';

import styles from './NewSticker.module.scss';

interface IProps {
  sticker: ISticker;
  stickerActiveId: string;
  handleActiveSticker: (id: string) => void;
  type: 'add' | 'edit';
}

export const NewSticker: FC<IProps> = ({ sticker, stickerActiveId, handleActiveSticker }) => {
  const {
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      shape: sticker.shape,
      amount: sticker.amount,
      size: sticker.size_type,
      width: sticker.optimal_width,
      height: sticker.optimal_height,
    },
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [customVisible, setCustomVisible] = useState<boolean>(sticker.size_type === 'custom');

  const shapesType = {
    circle: 'круг',
    square: 'квадрат',
    rounded_square: 'закругленный квадрат',
    contour: 'по контуру',
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);

    if (
      REG_STICKERS.test(number.toString()) &&
      number <= AMOUNT_INPUT_MAX_LENGTH &&
      number >= AMOUNT_INPUT_MIN_LENGTH
    ) {
      dispatch(updateSticker({ ...sticker, amount: number }));
      setBlock(false);
    }
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shape = event.target.value as TShape;

    if ((shape as TShape) === 'contour') {
      const formData = new FormData();
      formData.append('file', sticker.image);
    }

    dispatch(updateSticker({ ...sticker, shape }));
    setBlock(false);
  };

  const handleDelete = () => {
    dispatch(deleteSticker(sticker.id));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (sticker.id === 'newSticker') {
      dispatch(addStickers([sticker]))
        .then((res) => {
          const addedSticker = res.payload[0];
          dispatch(addSticker({ ...addedSticker }));
          dispatch(addEmptySticker());
        })
        .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })))
        .finally(() => {
          setLoading(false);
        });
    }

    if (sticker.id !== 'newSticker') {
      dispatch(putStickerInCart(sticker))
        .then(() => setBlock(true))
        .catch(() => dispatch(openMessage({ text: `${messages.somethingWrong}`, isError: true })))
        .finally(() => setLoading(false));
    }
  };

  const sizeValidate = (value: string): boolean => {
    return (
      REG_STICKERS.test(value) &&
      Number(value) >= SIZE_INPUT_MIN_LENGTH &&
      Number(value) <= SIZE_INPUT_MAX_LENGTH
    );
  };

  const onWidthChange = () => {
    const value = getValues('width').slice(0, 2);
    setValue('width', value.replace(/\D/g, ''));

    if (sizeValidate(value)) {
      dispatch(
        updateSticker({
          ...sticker,
          width: Number(value),
          height: sticker.shape === 'circle' ? Number(value) : sticker.height,
        })
      );
    }
    setBlock(false);
  };

  const onHeightChange = () => {
    const value = getValues('height').slice(0, 2);
    setValue('height', value.replace(/\D/g, ''));

    if (sizeValidate(value)) {
      dispatch(
        updateSticker({
          ...sticker,
          height: Number(value),
          width: sticker.shape === 'circle' ? Number(value) : sticker.width,
        })
      );
    }
    setBlock(false);
  };

  // Проверяем, изменились ли поля формы
  const image = watch('image');
  const shape = watch('shape');
  const amount = watch('amount');
  const size = watch('size');
  const width = watch('width');
  const height = watch('height');

  const initialSize = sticker.size_type;

  const fieldsUnchanged =
    initialSize === sticker.size_type &&
    sticker.shape === shape &&
    sticker.amount === amount &&
    sticker.width === width &&
    sticker.height === height;

  useEffect(() => {
    // const image = new File([sticker.image], 'image.png');
    // setValue('image', image);
    if (sticker.id === 'newSticker') {
      setValue('shape', sticker.shape);
      setValue('amount', sticker.amount);
      setValue('width', sticker.width);
      setValue('height', sticker.height);
      setValue('optimal_width', sticker.optimal_width);
      setValue('optimal_height', sticker.optimal_height);
      setValue('size', sticker.size_type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sticker]);

  return (
    <article
      className={cn(
        styles.card,
        sticker.id !== stickerActiveId && styles.card_unactive,
        sticker.id !== stickerActiveId && sticker.id === 'newSticker' && styles.card_unactive_new
      )}
      onClick={sticker.id === stickerActiveId ? () => null : () => handleActiveSticker(sticker.id)}
    >
      {loading && <Loader loading={loading} />}
      <form
        className={sticker.id === stickerActiveId ? styles.info : styles.info_unactive}
        onSubmit={handleSubmit}
      >
        <div className={styles.image}>
          {/* Оставляем драгндроп с инпутом картинки, чтобы при сворачивании карточки он не размонтировался и не очищался инпут*/}
          <DragAndDrop
            sticker={sticker}
            register={register}
            name='image'
            className={stickerActiveId !== sticker.id ? styles.hidden : ''}
          />
          <StickerImage
            sticker={sticker}
            boxWidth={144}
            boxHeight={144}
            className={stickerActiveId === sticker.id ? styles.hidden : ''}
          />
        </div>
        <fieldset className={cn(styles.flex, styles.flex_shapes)}>
          <label className={styles.category} htmlFor='shape'>
            Форма
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
            Количество стикеров
            {sticker.id !== stickerActiveId && <span className={styles.size_hidden}>{sticker.amount}шт</span>}
          </label>
          {sticker.id === stickerActiveId && (
            <InputField className='amount'>
              <Input
                className='amount'
                error={errors.amount}
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
            Размер
            {sticker.id !== stickerActiveId && (
              <span className={styles.size_hidden}>
                {sticker.width}x{sticker.height}см
              </span>
            )}
          </p>
          <div className={cn(styles.options, sticker.id !== stickerActiveId && styles.hidden)}>
            <RadioButton
              register={register}
              name='size'
              value='optimal'
              onClick={() => {
                setCustomVisible(false);
                setBlock(false);
                dispatch(
                  updateSticker({
                    ...sticker,
                    height: sticker.optimal_height,
                    width: sticker.optimal_width,
                    size_type: 'optimal',
                  })
                );
              }}
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
                onClick={() => {
                  setCustomVisible(true);
                  setBlock(false);
                  dispatch(
                    updateSticker({
                      ...sticker,
                      height: getValues('height'),
                      width: getValues('width'),
                      size_type: 'custom',
                    })
                  );
                }}
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
        {sticker.id === 'newSticker' ? (
          <ButtonCustom
            buttonType='submit'
            type='add'
            label='Добавить'
            title='Добавить в заказ'
            disabled={!isValid || sticker.image === ''}
            className={sticker.id === stickerActiveId && !loading ? styles.save : styles.hidden}
          />
        ) : (
          <ButtonCustom
            buttonType='submit'
            type='save'
            disabled={!isValid || fieldsUnchanged || block}
            className={sticker.id === stickerActiveId && !loading ? styles.save : styles.hidden}
            label='Сохранить'
            title='Сохранить'
          />
        )}
      </form>
      {sticker.id !== 'newSticker' && (
        <ButtonCustom
          type='delete'
          className={sticker.id === stickerActiveId ? styles.delete : styles.hidden}
          label='Удалить'
          title='Удалить'
          onClick={handleDelete}
        />
      )}
    </article>
  );
};
