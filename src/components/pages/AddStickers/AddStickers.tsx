import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';

import { RadioButton, TextUnderline, ButtonWithText, TitlePage, Container } from '../../UI';
import { NewSticker } from '../../index';
import { openPreview } from '../../../store/popupSlice';
import { pages, pagePrice } from '../../../utils/constants';
import { ICardsState } from '../../../interfaces';
import { addCard } from '../../../store/cardsSlice';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { calculateStickerOnList } from '../../../utils/calculateStickerOnList';
import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();

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
      }),
    );
  };

  return (
    <main>
      <Container className={styles.container}>
        <TitlePage type='main-title'>Заказать стикеры</TitlePage>
        {cards.map((card) => (
          <NewSticker key={card.id} card={card} />
        ))}
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
              onClick={() => dispatch(openPreview())}
            >
              Предпросмотр страницы
            </TextUnderline>
            <TextUnderline
              type='button'
              className={styles.preview}
              onClick={() => {
                calculateStickerOnList(cards);
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
          <div className={styles.options}>
            <RadioButton name='cut-stickers' value='false'>
              Оставить стикеры на листе
            </RadioButton>
            <RadioButton name='cut-stickers' value='true'>
              Вырезать стикеры по контуру
            </RadioButton>
          </div>

          <div className='preview'></div>
        </section>
      </Container>
    </main>
  );
};

export { AddStickers };
