import styles from './PopupForm.module.scss';

interface IProps {
  onClose: () => void;
}

const PopupForm: React.FC<IProps> = ({ onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} type='button' aria-label='Закрыть' onClick={onClose} />
    </div>
  );
};

export { PopupForm };
