import { TitlePage } from '../UI';
import { NewSticker } from '../index';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <NewSticker />
    </div>
  );
};

export { AddStickers };
