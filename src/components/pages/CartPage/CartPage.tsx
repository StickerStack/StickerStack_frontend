import { useEffect } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import { openInfo, openMessage } from '../../../store/popupSlice';
import { TitlePage, Container, ButtonWithText, TextUnderline, Input } from '../../UI';
import { ADD_STICKERS } from '../../../utils/constants';
import { Sticker } from '../../Sticker/Sticker';
import { ICardsState, CartState } from '../../../interfaces';
import { InfoBox } from '../../InfoBox/InfoBox';
import { cleanCart, countTotal, updateAddress, uploadOrder } from '../../../store/cartSlice';
import { cleanCards } from '../../../store/cardsSlice';

import { ReactComponent as WriteSvg } from '../../../images/icons/write-icon.svg';
import styles from './CartPage.module.scss';
import { converter } from '../../../utils/converter';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state: { cards: ICardsState }) => state.cards.cards);
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  useEffect(() => {
    setValue('address', cart.address);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(countTotal());
    // eslint-disable-next-line
  }, [cart.items]);

  // Пример запроса на оформление заказа

  const onSubmit = () => {
    dispatch(
      uploadOrder({
        cost: cart.cost,
        address: cart.address,
        number: cart.number_of_sheets,
        cropping: cart.cropping,
        stickers: cart.items.map((item) => {
          return {
            image:
              item.image.replace('data:image/png;base64,', '') ||
              item.image.replace('data:image/jpeg;base64,', '') ||
              item.image.replace('data:image/jpg;base64,', ''),
            shape: item.shape,
            amount: item.amount,
            width: converter.pxToCm(Math.round(item.size.width)),
            height: converter.pxToCm(Math.round(item.size.height)),
          };
        }),
      }),
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(cleanCards());
        dispatch(cleanCart());
        dispatch(
          openInfo({
            title: 'Заказ оформлен!',
            text: 'Следите за статусом заказа в личном кабинете',
            buttonText: 'Понятно!',
          }),
        );
      }
      if (res.meta.requestStatus === 'rejected') {
        dispatch(openMessage({ text: 'Не удалось оформить заказ', isError: true }));
      }
    });
  };

  return (
    <main className={styles.cart}>
      <Container className={styles.cart_container}>
        <TitlePage type='main-title'>Корзина</TitlePage>
        {cart.items.length === 0 ? (
          <div className={styles.box}>
            <span className={styles.text}>Ваша корзина пуста</span>
            <ButtonWithText color='contrast' onClick={() => navigate(ADD_STICKERS)}>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.flex}>
            <div className={cn(styles.banner, styles.cards)}>
              {cart.items.map((card) => (
                <Sticker key={card.id} card={card} />
              ))}
            </div>
            <form className={cn(styles.banner, styles.info)} onSubmit={handleSubmit(onSubmit)}>
              <InfoBox
                type='number'
                description='Количество листов'
                descriptionClass={styles.description}
              >
                {cart.number_of_sheets}
              </InfoBox>
              {cart.cropping && <span>Вырезать по контуру</span>}
              <InfoBox
                type='number'
                description='Количество стикеров'
                descriptionClass={styles.description}
              >
                {cart.totalAmount}
              </InfoBox>
              <InfoBox
                type='simple'
                description='Способ доставки'
                descriptionClass={styles.description}
              >
                Самовывоз
              </InfoBox>
              <InfoBox type='simple' description='Адрес' className={styles.address_box}>
                <div className={styles.address_box}>
                  <Input
                    register={register}
                    option={{
                      required: 'Введите адрес',
                      onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                        setValue('address', value.target.value.trim());
                        dispatch(updateAddress(value.target.value));
                      },
                    }}
                    name='address'
                    type='textarea'
                    className={cn(styles.address, errors.address && styles.address_error)}
                    placeholder='Выберите адрес'
                  />
                  <WriteSvg className={styles.write} />
                </div>
              </InfoBox>
              <InfoBox type='simple' description='Итого' numberClass={styles.number}>
                {cart.cost} ₽
              </InfoBox>
              <div className={styles.buttons}>
                <TextUnderline theme='secondary' onClick={() => navigate(ADD_STICKERS)}>
                  Редактировать заказ
                </TextUnderline>
                <ButtonWithText className={styles.button} type='submit'>
                  Оформить заказ
                </ButtonWithText>
              </div>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
};

export { CartPage };
