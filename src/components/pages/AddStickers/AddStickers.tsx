import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { updateCropping } from '../../../store/cartSlice';
import { ICart } from '../../../interfaces/ICart';
import { useAppDispatch } from '../../../hooks/hooks';
import { InfoBox } from '../../InfoBox/InfoBox';
import { NewSticker } from '../../NewSticker/NewSticker';
import { IStickersState } from '../../../interfaces/IStickersState';
import { ButtonWithText, Container, RadioButton, TextUnderline, TitlePage } from '../../UI';
import { addpage } from '../../../utils/content/stickerspage';
import { openPreview } from '../../../store/popupSlice';
import { CARDS_MAXIMUM } from '../../../utils/constants';

import styles from './AddStickers.module.scss';

export const AddStickersNew: FC = () => {
  const { stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);
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
        <section className={styles.cards}>
          {stickers.map((sticker) => (
            <NewSticker
              type='edit'
              key={sticker.id}
              sticker={sticker}
              stickerActiveId={stickerActiveId}
              handleActiveSticker={handleActiveSticker}
            />
          ))}
        </section>
        {/* {stickers.length < CARDS_MAXIMUM && (
          <ButtonWithText theme='transparent' onClick={handleAddCard}>
            {addpage.addSicker}
          </ButtonWithText>
        )} */}
        <section className={styles.info}>
          <div className={styles.info_pages}>
            <InfoBox type='number' description={addpage.pages}>
              {number_of_sheets}
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
              <span className={styles.price}>{cost} ₽</span>
              <span className={styles.price_small}>
                {Math.round(cost / totalAmount)} ₽/ за стикер
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
          <ButtonWithText onClick={() => naviagate('/cart')} className={styles.button}>
            Перейти в корзину
          </ButtonWithText>
        </section>
      </Container>
    </main>
  );
};
