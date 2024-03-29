import { useEffect } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import { useAppDispatch } from '@shared/hooks';
import {
  updateAddress,
  sendVerificationCode,
  getUser,
  closePopup,
  openInfo,
  openMessage,
  openPreview,
} from '@shared/store';
import { ICart, IUserState, IStickersState } from '@shared/interfaces';
import { ADD_STICKERS, getRandomNumber } from '@utils/constants';
import { TitlePage, Container, ButtonWithText, TextUnderline, Error, Loader } from '@components/UI';
import { Dots } from '@components/animations/Dots/Dots';
import { Sticker, InfoBox } from '@components/index';
import { messages, verifyBeforeOredering } from '@static/popups';
import { cartpage } from '@static/stickerspage';

import WriteSvg from '@images/icons/write-icon.svg?react';
import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { stickers, loading, error } = useSelector((state: { stickers: IStickersState }) => state.stickers);
  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const { isVerified } = useSelector((state: { user: IUserState }) => state.user);

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

  const onSubmit = () => {
    dispatch(getUser())
      .then(() => {
        if (isVerified) {
          dispatch(openPreview());
        } else {
          const randomNumber = getRandomNumber(1, 3);
          dispatch(
            openInfo({
              title: `${verifyBeforeOredering.title}`,
              text: `${verifyBeforeOredering.text}`,
              buttonText: `${verifyBeforeOredering.buttonText}`,
              onClick: () =>
                dispatch(sendVerificationCode())
                  .then(() => closePopup())
                  .catch(() =>
                    dispatch(
                      openMessage({
                        text: `${messages.somethingWrong}`,
                        isError: true,
                      }),
                    ),
                  ),
              image: require(`../../../images/check-your-mail-${randomNumber}.png`),
            }),
          );
        }
      })
      .catch(() =>
        dispatch(
          openMessage({
            text: `${messages.somethingWrong}`,
            isError: true,
          }),
        ),
      );
  };

  return (
    <main className={styles.cart}>
      <Container className={styles.cart_container}>
        <TitlePage type='main-title'>{cartpage.title}</TitlePage>
        {loading ? (
          <div style={{ margin: '0 auto' }}>
            <Loader loading={loading} background={false} />
            <Dots text={`${cartpage.loading}`} />
          </div>
        ) : error ? (
          <Error>{cartpage.error}</Error>
        ) : stickers.length < 2 ? (
          <div className={styles.box}>
            <div className={styles.image} />
            <span className={styles.text}>{cartpage.empty}</span>
            <ButtonWithText onClick={() => navigate(ADD_STICKERS)} color='contrast'>
              Заказать стикеры
            </ButtonWithText>
          </div>
        ) : (
          <div className={styles.flex}>
            <div className={cn(styles.banner, styles.cards)}>
              {stickers.slice(0, stickers.length - 1).map((sticker) => (
                <Sticker key={sticker.id} card={sticker} />
              ))}
            </div>
            <form className={cn(styles.banner, styles.info)} onSubmit={handleSubmit(onSubmit)}>
              <InfoBox type='number' description={cartpage.pages} descriptionClass={styles.description}>
                {cart.number_of_sheets}
              </InfoBox>
              {cart.cropping && <span>{cartpage.cropping}</span>}
              <InfoBox type='number' description={cartpage.stickers} descriptionClass={styles.description}>
                {cart.totalAmount}
              </InfoBox>
              <InfoBox type='simple' description={cartpage.delivery} descriptionClass={styles.description}>
                Самовывоз
              </InfoBox>
              <InfoBox type='simple' description={cartpage.address} className={styles.address_box}>
                <div className={styles.address_box}>
                  <textarea
                    {...register('address', {
                      required: 'Введите адрес',
                      onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
                        setValue('address', value.target.value.trim());
                        dispatch(updateAddress(value.target.value));
                      },
                    })}
                    disabled
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
                  {cartpage.link}
                </TextUnderline>
                <ButtonWithText className={styles.button} type='submit'>
                  {cartpage.button}
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
