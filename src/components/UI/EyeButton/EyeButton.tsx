import styles from './EyeButton.module.scss';

interface IProps {
  onClick?: () => void;
  shown: boolean;
  visible: boolean;
}

//TODO Удалить? есть аналогичный компонент - IconButton.
const EyeButton: React.FC<IProps> = ({ onClick, shown, visible }: IProps) => {
  return (
    <button
      className={shown ? styles.button_shown : styles.button_hidden}
      style={!visible ? { display: 'none' } : {}}
      onClick={onClick}
      type='button'
    />
  );
};

export { EyeButton };
