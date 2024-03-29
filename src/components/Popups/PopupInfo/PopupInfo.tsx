import { useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { IPopupState } from '@shared/interfaces';
import { ButtonWithText, TextForm, TitlePopup } from '@components/UI';
import { closePopup } from '@shared/store';
import { useAppDispatch } from '@shared/hooks';

import styles from './PopupInfo.module.scss';

const PopupInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { info } = useSelector((state: { popup: IPopupState }) => state.popup);
  const onClick = info.onClick;
  const onClickSecond = info.onClickSecond;

  const imageRef = useRef<HTMLImageElement>();

  return (
    <div className={styles.container}>
      {info.src && (
        <img
          ref={(img: HTMLImageElement) => {
            imageRef.current = img;
          }}
          className={cn(
            styles.image,
            info.imageAbsolute && styles.image_absolute,
            info.imageAbsolute && window.innerWidth < 768 && styles.image_absolute_small,
          )}
          src={info.src}
          alt='Декоративное изображение'
        />
      )}
      <TitlePopup
        style={{
          marginTop: info.imageAbsolute && window.innerWidth < 768 ? imageRef?.current?.clientHeight : 0,
        }}
        className={styles.title}
      >
        {info.title}
      </TitlePopup>
      <TextForm>{info.text}</TextForm>
      {!info.buttonSecondText ? (
        <ButtonWithText
          className={styles.button_wide}
          onClick={() => {
            localStorage.removeItem('email');
            dispatch(closePopup());
            if (onClick) {
              onClick();
            }
          }}
        >
          {info.buttonText}
        </ButtonWithText>
      ) : (
        <div className={styles.buttons}>
          <ButtonWithText
            className={styles.button}
            onClick={() => {
              localStorage.removeItem('email');
              dispatch(closePopup());
              if (onClick) {
                onClick();
              }
            }}
          >
            {info.buttonText}
          </ButtonWithText>
          <ButtonWithText
            className={styles.button}
            theme='transparent'
            onClick={() => {
              if (onClickSecond) {
                onClickSecond();
              }
              dispatch(closePopup());
            }}
          >
            {info.buttonSecondText}
          </ButtonWithText>
        </div>
      )}
    </div>
  );
};

export { PopupInfo };
