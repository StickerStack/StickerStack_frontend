import styles from './Loader.module.scss';

interface Props {
  loading: boolean;
}

const Loader: React.FC<Props> = ({ loading }: Props) => {
  return loading ? <div className={styles.loader} /> : null;
};

export { Loader };
