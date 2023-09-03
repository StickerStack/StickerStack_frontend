import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';
import { ButtonWithText, TextForm, TitlePopup } from '../../UI';
import { closePopup } from '../../../store/popupSlice';
import { useAppDispatch } from '../../../hooks/hooks';

import styles from './PopupInfo.module.scss';

const PopupInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { info } = useSelector((state: { popup: IPopupState }) => state.popup);
  const onClick = info.onClick;
  const onClickSecond = info.onClickSecond;

  return (
    <div className={styles.container}>
      {info.src && <img className={styles.image} src={info.src} alt='Декоративное изображение' />}
      <TitlePopup className={styles.title}>{info.title}</TitlePopup>
      <TextForm>{info.text}</TextForm>
      {!info.buttonSecondText ? (
        <ButtonWithText
          className={styles.button_wide}
          onClick={() => {
            localStorage.removeItem('email');
            if (onClick) {
              onClick();
            }
            dispatch(closePopup());
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
              if (onClick) {
                onClick();
              }
              dispatch(closePopup());
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
