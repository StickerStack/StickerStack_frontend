import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';
import { Sticker } from '../../Sticker/Sticker';
import { RadioButton, TextUnderline, ButtonWithText, TitlePage, Container } from '../../UI';
import { NewSticker } from '../../index';
import { setPreviewIsOpen } from '../../../store/popupSlice';
import { pages, pagePrice, CART } from '../../../utils/constants';
import { ICardsState } from '../../../interfaces';
import { addCard, setActive } from '../../../store/cardsSlice';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fullPrice = pagePrice * pages.length;
  const itemPrice = (pagePrice * pages.length) / (pages.length * 35);

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);

  const handleAddCard = () => {
    dispatch(
      addCard({
        image: '',
        shape: 'square',
        amount: 1,
        size: { width: 0, height: 0 },
        id: generateRandomNumber(),
        active: true,
      }),
    );
  };

  return (
    <main>
      <Container className={styles.container}>
        <TitlePage>Заказать стикеры</TitlePage>
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
            <div className={styles.flex}>
              <span className={styles.text}>Количество листов А4</span>
              <span className={styles.amount}>{pages.length}</span>
            </div>
            <TextUnderline
              type='button'
              className={styles.preview}
              onClick={() => dispatch(setPreviewIsOpen(true))}
            >
              Предпросмотр страницы
            </TextUnderline>
          </div>
          <div className={styles.flex}>
            <span className={styles.text}>Стоимость</span>
            <div className={styles.prices}>
              <span className={styles.price}>{fullPrice} ₽</span>
              <span className={styles.price_small}>{itemPrice}₽/ за шт</span>
            </div>
          </div>
          <div className={styles.options}>
            <RadioButton name='cut-stickers' value='false'>
              Оставить стикеры на листе
            </RadioButton>
            <RadioButton name='cut-stickers' value='true'>
              Вырезать стикеры по контуру
            </RadioButton>
          </div>
        </section>
        <ButtonWithText theme='filled' onClick={() => navigate(CART)}>
          Добавить в корзину
        </ButtonWithText>
      </Container>
    </main>
  );
};

export { AddStickers };
