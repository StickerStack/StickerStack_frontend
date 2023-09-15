import cn from 'classnames';

import { ReactComponent as CartSvg } from '../../../images/icons/cart.svg';
import { ReactComponent as PersonSvg } from '../../../images/icons/profile-icon.svg';
import styles from './ButtonCustom.module.scss';

type ButtonType = 'close' | 'person' | 'cart' | 'delete' | 'arrow' | 'more' | 'save' | 'add';

interface IProps {
  type: ButtonType;
  className?: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
}

const ButtonCustom: React.FC<IProps> = ({ type, disabled, className, label, onClick, buttonType = 'button'}: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${type}`], className)}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
    >
      {type === 'cart' && <CartSvg className={styles.button_cart_image} />}
      {type === 'person' && <PersonSvg className={styles.button_person_image} />}
    </button>
  );
};

export { ButtonCustom };
