import styles from './EyeButton.module.scss';

interface IProps {
  onClick?: () => void;
  shown: boolean;
}

const EyeButton: React.FC<IProps> = ({ onClick, shown }: IProps) => {
  return (
    <button
      className={shown ? styles.button_shown : styles.button_hidden}
      onClick={onClick}
      type='button'
    />
  );
};

export { EyeButton };
