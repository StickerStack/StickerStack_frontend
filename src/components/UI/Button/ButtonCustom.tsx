import cn from 'classnames';
import styles from './ButtonCustom.module.scss';

export type ButtonType = 'close' | 'person' | 'cart';

interface IProps {
  type: ButtonType;
  className: string;
  onClick?: () => void;
}

const ButtonCustom: React.FC<IProps> = ({ type, className, onClick }: IProps) => {
  return (
    <button
      className={cn(styles.button, styles[`button_${type}`], className)}
      aria-label={type === 'close' ? 'Закрыть' : type === 'person' ? 'Профиль' : ''}
      onClick={onClick}
    />
  );
};

export { ButtonCustom };
