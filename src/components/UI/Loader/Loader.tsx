import styles from './Loader.module.scss';

interface Props {
  loading: boolean;
}

const Loader: React.FC<Props> = ({ loading }: Props) => {
  return loading ? (
    <div className={styles.loader_block}>
      <div className={styles.loader} />
    </div>
  ) : null;
};

export { Loader };
