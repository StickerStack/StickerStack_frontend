import cn from 'classnames';

import CartSvg from '../../../assets/images/icons/cart.svg?react';
import PersonSvg from '../../../assets/images/icons/profile-icon.svg?react';
import styles from './ButtonCustom.module.scss';

type ButtonType = 'close' | 'person' | 'cart' | 'delete' | 'arrow' | 'more' | 'save' | 'add';

interface IProps {
  type: ButtonType;
  className?: string;
  label: string;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
}

const ButtonCustom: React.FC<IProps> = ({
  type,
  disabled,
  className,
  label,
  title,
  onClick,
  buttonType = 'button',
}: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${type}`], disabled && styles.disabled, className)}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
      title={title}
    >
      {type === 'cart' && <CartSvg className={styles.button_cart_image} />}
      {type === 'person' && <PersonSvg className={styles.button_person_image} />}
    </button>
  );
};

export { ButtonCustom };
