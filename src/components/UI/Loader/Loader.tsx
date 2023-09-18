import styles from './Loader.module.scss';

interface Props {
  loading: boolean;
  background?: boolean;
}

const Loader: React.FC<Props> = ({ loading, background = true }: Props) => {
  return loading ? (
    background ? (
      <div className={styles.loader_block}>
        <div className={styles.loader} />
      </div>
    ) : (
      <div className={styles.loader} />
    )
  ) : null;
};

export { Loader };
