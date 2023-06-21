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
  ButtonWithText,
} from '../UI';
import { DragAndDrop } from '../';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteCard, removeBackground, setActive, updateCard } from '../../store/cardsSlice';
import { ICard, ICardsState } from '../../interfaces';
import { TCardShape } from '../../interfaces/ICard';
import { registerAmount, registerSize } from '../../utils/registersRHF';

import { ReactComponent as RectSvg } from '../../images/icons/rect.svg';
import { ReactComponent as RectRondedSvg } from '../../images/icons/rect_rounded.svg';
import { ReactComponent as CircleSvg } from '../../images/icons/circle.svg';
import { ReactComponent as ContourSvg } from '../../images/icons/contour.svg';
import { tooltipText } from '../../utils/texts';

import styles from './NewSticker.module.scss';
import { Sticker } from '../Sticker/Sticker';
import { addItem } from '../../store/cartSlice';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  card: ICard;
}

const NewSticker: React.FC<IProps> = ({ card }: IProps) => {
  const dispatch = useAppDispatch();
  const [customVisible, setCustomVisible] = useState<boolean>(false);
  const [cardShape, setCardShape] = useState<TCardShape>('square');
  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  // const items = useSelector((state: { items: CartState }) => state.items.items);

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
    defaultValues: { size: 'optimal' },
  });

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardShape(event.target.value as TCardShape);
    const copyCard = { ...card };
    copyCard.shape = event.target.value as TCardShape;

    if ((event.target.value as TCardShape) === 'contour') {
      const formData = new FormData();
      formData.append('file', card.image);
      dispatch(removeBackground({ data: formData, id: card.id }));
    }

    dispatch(updateCard({ id: card.id, updatedCard: copyCard }));
  };

  return (
    <AnimatePresence>
      {card.active && (
        <motion.section
          className={styles.card}
          style={{ overflow: 'hidden' }}
          initial={{
            opacity: 0.4,
            scaleY: 0.8,
            // height: 0,
          }}
          animate={{
            transition: {
              scaleY: { duration: 0.5 },
              // height: { duration: 0.4 },
              opacity: { duration: 0.25, delay: 0.15 },
            },
            opacity: 1,
            scaleY: 1,
            // height: 'auto',
          }}
          exit={{
            opacity: 0,
            // height: 0,
            scaleY: 0.7,
            transition: {
              scaleY: { duration: 0.5 },
              // height: { duration: 0.4 },
              opacity: { duration: 0.25 },
            },
          }}
        >
          <motion.form className={styles.info}>
            <motion.div className={styles.image}>
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
            </motion.div>
            <motion.fieldset className={cn(styles.flex, styles.flex_shapes)}>
              <motion.p className={styles.category}>Форма</motion.p>
              <motion.div className={styles.shapes}>
                <input
                  className={styles.radio}
                  type='radio'
                  id={`${card.id}-shape-square`}
                  name={`${card.id}-shape`}
                  value='square'
                  checked={cardShape === 'square'}
                  onChange={onShapeChange}
                />
                <motion.label className={styles.label} htmlFor={`${card.id}-shape-square`}>
                  <div className={styles.shape}>
                    <div className={styles.shape_pic}>
                      <RectSvg />
                    </div>
                    <span className={styles.shape_title}>Квадрат</span>
                  </div>
                </motion.label>

                <input
                  className={styles.radio}
                  type='radio'
                  id={`${card.id}-shape-rounded-square`}
                  name={`${card.id}-shape`}
                  value='rounded-square'
                  checked={cardShape === 'rounded-square'}
                  onChange={onShapeChange}
                />
                <motion.label className={styles.label} htmlFor={`${card.id}-shape-rounded-square`}>
                  <div className={styles.shape}>
                    <div className={styles.shape_pic}>
                      <RectRondedSvg />
                    </div>
                    <span className={styles.shape_title}>Закругленный квадрат</span>
                  </div>
                </motion.label>

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
                <motion.label className={styles.label} htmlFor={`${card.id}-shape-contour`}>
                  <motion.div className={styles.shape}>
                    <motion.div className={styles.shape_pic}>
                      <ContourSvg />
                    </motion.div>
                    <span className={styles.shape_title}>По контуру</span>
                  </motion.div>
                </motion.label>
              </motion.div>
            </motion.fieldset>
            <motion.div>
              <motion.div className={styles.flex}>
                <motion.label
                  className={styles.category}
                  htmlFor='amount'
                  onClick={() => console.log(errors)}
                >
                  Количество стикеров
                </motion.label>
                <motion.div>
                  <Input
                    className='amount'
                    register={register}
                    option={registerAmount}
                    name='amount'
                  />
                  <Error className={styles.error}>
                    {errors.amount && `${errors.amount?.message}`}
                  </Error>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.fieldset className={styles.flex}>
              <motion.p className={styles.category}>Размер</motion.p>
              <motion.div className={styles.options}>
                <RadioButton
                  register={register}
                  name='size'
                  value='optimal'
                  onClick={() => setCustomVisible(false)}
                >
                  Оптимальный размер
                  <TooltipCustom text={tooltipText} />
                </RadioButton>
                <motion.div className={styles.option}>
                  <RadioButton
                    register={register}
                    name='size'
                    value='custom'
                    className={styles.size}
                    onClick={() => setCustomVisible(true)}
                  >
                    Свой размер
                  </RadioButton>
                  <motion.div className={cn(customVisible ? styles.visible : styles.hidden)}>
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
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.fieldset>

            <motion.div className={styles.flex}>
              <motion.p className={styles.category}>Цвет фона</motion.p>
              <motion.label className={styles.text}>белый</motion.label>
              <motion.div className={styles.color_sample} />
            </motion.div>
            <motion.div className={styles.flex}>
              <motion.p className={styles.category}>Материал</motion.p>
              <motion.p className={styles.text}>винил</motion.p>
            </motion.div>
          </motion.form>
          {cards.length > 1 && (
            <ButtonCustom
              type='delete'
              className={styles.delete}
              label='Удалить'
              onClick={handleDelete}
            />
          )}
          {/* ToDo Кнопка активна, когда все поля карточки валидны */}
          {/* <ButtonWithText theme='transparent' className={styles.add}>
        В корзину
      </ButtonWithText> */}
        </motion.section>
      )}
      {!card.active && (
        <motion.div
          className={styles.motion}
          initial={{
            opacity: 0.4,
            scaleY: 1.2,
            // height: 0,
          }}
          animate={{
            transition: {
              scaleY: { duration: 0.5 },
              // height: { duration: 0.4 },
              opacity: { duration: 0.25, delay: 0.15 },
            },
            opacity: 1,
            scaleY: 1,
            // height: 'auto',
          }}
          exit={{
            opacity: 0,
            // height: 0,
            scaleY: 0.7,
            transition: {
              scaleY: { duration: 0.5 },
              // height: { duration: 0.4 },
              opacity: { duration: 0.25 },
            },
          }}
        >
          <Sticker card={card} onClick={() => dispatch(setActive(card.id))} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { NewSticker };
