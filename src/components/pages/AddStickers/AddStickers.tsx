import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { Sticker } from '../../Sticker/Sticker';
import { RadioButton, TextUnderline, ButtonWithText, TitlePage, Container } from '../../UI';
import { NewSticker } from '../../index';
import { InfoBox } from '../../InfoBox/InfoBox';
import { openMessage, openPreview } from '../../../store/popupSlice';
import { pagePrice, pageSizePx, CART, CARDS_MAXIMUM } from '../../../utils/constants';
import { ICardsState } from '../../../interfaces';
import { ICart } from '../../../interfaces/ICart';
import { addCard, setActive, setProcessing } from '../../../store/cardsSlice';
import { addSticker, getCart, updateCropping, updateSheets } from '../../../store/cartSlice';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { calculateStickerOnList } from '../../../utils/calculateStickerOnList';
import { messages } from '../../../utils/content/popups';
import { addpage } from '../../../utils/content/stickerspage';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const validation = useSelector((state: { cards: ICardsState }) => state.cards.valid);

  const fullPrice = pagePrice * cart.number_of_sheets;
  const fullAmount = cards.reduce((acc, item) => acc + item.amount, 0);
  const itemPrice = Math.round((pagePrice * cart.number_of_sheets) / fullAmount);

  const handleAddCard = () => {
    dispatch(
      addCard({
        image: '',
        shape: 'square',
        amount: 1,
        size: { width: 0, height: 0 },
        optimalSize: { width: 0, height: 0 },
        id: `${generateRandomNumber()}`,
        active: true,
        valid: false,
      }),
    );
  };

  useEffect(() => {
    if (cards) {
      calculateStickerOnList(cards, {
        paddingList: {
          top: pageSizePx.paddingList.top,
          right: pageSizePx.paddingList.right,
          bottom: pageSizePx.paddingList.bottom,
          left: pageSizePx.paddingList.left,
        },
        gapX: pageSizePx.gapX,
        gapY: pageSizePx.gapY,
        widthPage: pageSizePx.widthPage,
        heightPage: pageSizePx.heightPage,
      });

      dispatch(
        updateSheets(JSON.parse(localStorage.getItem('pagesWithStickers') || '[]')?.length || 1),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

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
        <TitlePage type='main-title'>{addpage.title}</TitlePage>
        <div className={styles.cards}>
          {cards.map((card) => (
            <AnimatePresence key={card.id}>
              {card.active && (
                <motion.div
                  className={card.active ? styles.motion : styles.motion_inactive}
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
              )}
              {!card.active && (
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
        {cards.length < CARDS_MAXIMUM && (
          <ButtonWithText theme='transparent' onClick={handleAddCard} disabled={!validation}>
            {addpage.addSicker}
          </ButtonWithText>
        )}
        <section className={styles.info}>
          <div className={styles.info_pages}>
            <InfoBox type='number' description={addpage.pages}>
              {cart.number_of_sheets}
            </InfoBox>
            <TextUnderline
              type='button'
              className={styles.preview}
              onClick={() => dispatch(openPreview())}
            >
              {addpage.preview}
            </TextUnderline>
          </div>
          <div className={styles.flex}>
            <span className={styles.text}>{addpage.price}</span>
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
              {addpage.options.page}
            </RadioButton>
            <RadioButton
              name='cut'
              value='true'
              register={register}
              onClick={() => dispatch(updateCropping(true))}
            >
              {addpage.options.crop}
            </RadioButton>
          </form>
        </section>
        {cart.items.length === 0 ? (
          <ButtonWithText
            theme='filled'
            className={styles.button}
            loading={loading}
            onClick={() => {
              dispatch(setProcessing(true));
              setLoading(true);
              const cardLast = cards[cards.length - 1];

              cards.forEach((card) => {
                if (card.id !== cardLast.id) {
                  dispatch(
                    addSticker({
                      amount: card.amount,
                      image: card.image.startsWith('data:image/png;base64,')
                        ? card.image.replace('data:image/png;base64,', '')
                        : card.image.startsWith('data:image/jpeg;base64,')
                        ? card.image.replace('data:image/jpeg;base64,', '')
                        : card.image.startsWith('data:image/jpg;base64,')
                        ? card.image.replace('data:image/jpg;base64,', '')
                        : '',
                      shape: card.shape,
                      height: card.size.height,
                      width: card.size.width,
                    }),
                  );
                } else {
                  dispatch(
                    addSticker({
                      amount: card.amount,
                      image: card.image.startsWith('data:image/png;base64,')
                        ? card.image.replace('data:image/png;base64,', '')
                        : card.image.startsWith('data:image/jpeg;base64,')
                        ? card.image.replace('data:image/jpeg;base64,', '')
                        : card.image.startsWith('data:image/jpg;base64,')
                        ? card.image.replace('data:image/jpg;base64,', '')
                        : '',
                      shape: card.shape,
                      height: card.size.height,
                      width: card.size.width,
                    }),
                  )
                    .unwrap()
                    .then(() => {
                      console.log('Успешно');
                      dispatch(getCart());
                      navigate(CART);
                      setTimeout(() => dispatch(setProcessing(false)), 3000);
                    })
                    .catch(() =>
                      dispatch(
                        openMessage({
                          text: `${messages.somethingWrong}`,
                          isError: true,
                        }),
                      ),
                    )
                    .finally(() => {
                      setLoading(false);
                    });
                }
              });
            }}
            disabled={!validation}
          >
            {addpage.button.add}
          </ButtonWithText>
        ) : (
          <ButtonWithText theme='filled' className={styles.button} onClick={() => navigate(CART)}>
            {addpage.button.cart}
          </ButtonWithText>
        )}
      </Container>
    </main>
  );
};

export { AddStickers };
