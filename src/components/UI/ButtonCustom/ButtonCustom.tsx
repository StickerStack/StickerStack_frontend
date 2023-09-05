import cn from 'classnames';

import { ReactComponent as CartSvg } from '../../../images/icons/cart.svg';
import { ReactComponent as PersonSvg } from '../../../images/icons/profile-icon.svg';
import styles from './ButtonCustom.module.scss';

type ButtonType = 'close' | 'person' | 'cart' | 'delete' | 'arrow' | 'more';

interface IProps {
  type: ButtonType;
  className?: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonCustom: React.FC<IProps> = ({ type, disabled, className, label, onClick }: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${type}`], className)}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {type === 'cart' && <CartSvg className={styles.button_image} />}
      {type === 'person' && <PersonSvg className={styles.button_image} />}
    </button>
  );
};

export { ButtonCustom };
