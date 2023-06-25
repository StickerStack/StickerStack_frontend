import { useSelector } from 'react-redux';

import { IPopupState } from '../../../interfaces/IPopupState';
import { ButtonWithText, TextForm, TitlePopup } from '../../UI';

import logo from '../../../images/logo-decoration.svg';
import styles from './PopupInfo.module.scss';

interface IProps {
  onClick: () => void;
}

const PopupInfo: React.FC<IProps> = ({ onClick }: IProps) => {
  const popup = useSelector((state: { popup: IPopupState }) => state.popup);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={logo} alt='Декоративное изображение' />
      <TitlePopup>{popup.infoTitle}</TitlePopup>
      <TextForm>{popup.infoText}</TextForm>
      <ButtonWithText onClick={onClick}>{popup.infoButtonText}</ButtonWithText>
    </div>
  );
};

export { PopupInfo };
