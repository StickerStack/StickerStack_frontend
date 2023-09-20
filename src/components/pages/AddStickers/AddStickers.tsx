import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import { updateCropping } from '../../../store/cartSlice';
import { ICart } from '../../../interfaces/ICart';
import { useAppDispatch } from '../../../hooks/hooks';
import { InfoBox } from '../../InfoBox/InfoBox';
import { NewSticker } from '../../NewSticker/NewSticker';
import { IStickersState } from '../../../interfaces/IStickersState';
import { ButtonWithText, Container, RadioButton, TextUnderline, TitlePage, Error } from '../../UI';
import { addpage } from '../../../utils/content/stickerspage';
import { openPreview } from '../../../store/popupSlice';
import { CARDS_MAXIMUM, pagePrice } from '../../../utils/constants';
import { Dots } from '../../animations/Dots/Dots';
import { Loader } from '../../UI/Loader/Loader';

import styles from './AddStickers.module.scss';

export const AddStickersNew: FC = () => {
  const { stickers, loading, error } = useSelector(
    (state: { stickers: IStickersState }) => state.stickers,
  );
  const { cropping, cost, totalAmount, number_of_sheets } = useSelector(
    (state: { cart: ICart }) => state.cart,
  );
  const [stickerActiveId, setStickerActiveId] = useState(stickers[0].id);

  const dispatch = useAppDispatch();

  const naviagate = useNavigate();

  const handleActiveSticker = (id: string) => setStickerActiveId(id);

  const { register } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: { cut: `${cropping}` },
  });

  return (
    <main className={styles.add}>
      <Container className={styles.add_container}>
        <TitlePage type='main-title'>{addpage.title}</TitlePage>
        {loading ? (
          <div style={{ margin: '0 auto' }}>
            <Loader loading={loading} background={false} />
            <Dots text={`${addpage.loading}`} />
          </div>
        ) : error ? (
          <Error>{addpage.error}</Error>
        ) : (
          <div className={styles.content}>
            <section className={styles.cards}>
              {stickers.map((sticker) => (
                <AnimatePresence key={sticker.id}>
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
                    <NewSticker
                      type='edit'
                      key={sticker.id}
                      sticker={sticker}
                      stickerActiveId={stickerActiveId}
                      handleActiveSticker={handleActiveSticker}
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
            </section>
            {/* {stickers.length < CARDS_MAXIMUM && (
          <ButtonWithText theme='transparent' onClick={handleAddCard}>
            {addpage.addSicker}
          </ButtonWithText>
        )} */}
            <section className={styles.info}>
              <div className={styles.info_pages}>
                <InfoBox
                  type='number'
                  description={addpage.pages}
                  tooltip={`Текущая цена за печать одного листа - ${pagePrice}р`}
                >
                  {number_of_sheets}
                </InfoBox>
                <TextUnderline
                  type='button'
                  className={styles.preview}
                  onClick={() => dispatch(openPreview())}
                  title={`${stickers.length < 2 ? 'Для начала положите стикер в корзину' : ''} `}
                  disabled={stickers.length < 2}
                >
                  {addpage.preview}
                </TextUnderline>
              </div>
              <div className={styles.flex}>
                <span className={styles.text}>{addpage.price}</span>
                <div className={styles.prices}>
                  <span className={styles.price}>{cost} ₽</span>
                  <span className={styles.price_small}>
                    {totalAmount > 0 && Math.round(cost / totalAmount)} ₽/за стикер
                  </span>
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
            <ButtonWithText onClick={() => naviagate('/cart')} className={styles.button}>
              Перейти в корзину
            </ButtonWithText>
          </div>
        )}
      </Container>
    </main>
  );
};
