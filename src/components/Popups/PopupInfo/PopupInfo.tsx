import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';
import { ButtonWithText, TextForm, TitlePopup } from '../../UI';
import { closePopup } from '../../../store/popupSlice';

import { useAppDispatch } from '../../../hooks/hooks';
import logo from '../../../images/logo-decoration.svg';
import styles from './PopupInfo.module.scss';


const PopupInfo: React.FC = () => {
  const { info } = useSelector((state: { popup: IPopupState }) => state.popup);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <img className={styles.image} src={logo} alt='Декоративное изображение' />
      <TitlePopup>{info.title}</TitlePopup>
      <TextForm>{info.text}</TextForm>
      <ButtonWithText onClick={() => dispatch(closePopup())}>{info.buttonText}</ButtonWithText>
    </div>
  );
};

export { PopupInfo };
