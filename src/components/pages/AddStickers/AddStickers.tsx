import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { Sticker } from '../../Sticker/Sticker';
import { RadioButton, TextUnderline, ButtonWithText, TitlePage, Container } from '../../UI';
import { NewSticker } from '../../index';
import { InfoBox } from '../../InfoBox/InfoBox';
import { openPreview } from '../../../store/popupSlice';
import { pages, pagePrice, CART } from '../../../utils/constants';
import { CartState, ICardsState } from '../../../interfaces';
import { addCard, setActive } from '../../../store/cardsSlice';
import { addItems, updateCropping } from '../../../store/cartSlice';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { calculateStickerOnList } from '../../../utils/calculateStickerOnList';
import { calculateLists } from '../../../utils/calculateLists';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fullPrice = pagePrice * pages.length;
  const itemPrice = Math.round((pagePrice * pages.length) / (pages.length * 35));

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const validation = useSelector((state: { cards: ICardsState }) => state.cards.valid);

  const handleAddCard = () => {
    dispatch(
      addCard({
        image: '',
        shape: 'square',
        amount: 1,
        size: { width: 0, height: 0 },
        optimalSize: { width: 0, height: 0 },
        id: generateRandomNumber(),
        active: true,
        valid: false,
      }),
    );
  };

  const cropping = () => {
    if (cart.cropping) {
      return 'true';
    } else return 'false';
  };

  const { register } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: { cut: cropping() },
  });

  return (
    <main className={styles.add}>
      <Container className={styles.add_container}>
        <TitlePage type='main-title'>Заказать стикеры</TitlePage>
        <div className={styles.cards}>
          {cards.map((card) => (
            <AnimatePresence key={card.id}>
              {card.active ? (
                <motion.div
                  className={styles.motion}
                  initial={{
                    opacity: 0.4,
                    height: 0,
                  }}
                  animate={{
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.25, delay: 0.15 },
                    },
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.25 },
                    },
                  }}
                >
                  <NewSticker key={card.id} card={card} />
                </motion.div>
              ) : (
                <motion.div
                  className={styles.motion}
                  initial={{
                    opacity: 0.4,
                    height: 0,
                  }}
                  animate={{
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.25, delay: 0.15 },
                    },
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.25 },
                    },
                  }}
                >
                  <Sticker card={card} onClick={() => dispatch(setActive(card.id))} />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        <ButtonWithText theme='transparent' onClick={handleAddCard}>
          Добавить стикер
        </ButtonWithText>
        <section className={styles.info}>
          <div className={styles.info_pages}>
            <InfoBox type='number' description='Количество листов'>
              {pages.length}
            </InfoBox>
            <TextUnderline
              type='button'
              className={styles.preview}
              onClick={() => dispatch(openPreview())}
            >
              Предпросмотр страницы
            </TextUnderline>
            <TextUnderline
              type='button'
              className={styles.preview}
              onClick={() => {
                console.log(
                  calculateLists(cards, {
                    paddingList: { top: 40, right: 40, bottom: 40, left: 40 },
                    gapX: 20,
                    gapY: 22,
                    widthPage: 2480,
                    heightPage: 3508,
                  }),
                );
              }}
            >
              Рассчитать стоимость
            </TextUnderline>
          </div>
          <div className={styles.flex}>
            <span className={styles.text}>Стоимость</span>
            <div className={styles.prices}>
              <span className={styles.price}>{fullPrice} ₽</span>
              <span className={styles.price_small}>{itemPrice}₽/ за шт</span>
            </div>
          </div>
          <form className={styles.options}>
            <RadioButton
              name='cut'
              value='false'
              register={register}
              onClick={() => dispatch(updateCropping(false))}
            >
              Оставить стикеры на листе
            </RadioButton>
            <RadioButton
              name='cut'
              value='true'
              register={register}
              onClick={() => dispatch(updateCropping(true))}
            >
              Вырезать стикеры по контуру
            </RadioButton>
          </form>
        </section>
        {cart.items.length === 0 ? (
          <ButtonWithText
            theme='filled'
            className={styles.button}
            onClick={() => {
              dispatch(addItems(cards));
              navigate(CART);
            }}
            disabled={!validation}
          >
            Добавить в корзину
          </ButtonWithText>
        ) : (
          <ButtonWithText theme='filled' className={styles.button} onClick={() => navigate(CART)}>
            Перейти в корзину
          </ButtonWithText>
        )}
      </Container>
    </main>
  );
};

export { AddStickers };
