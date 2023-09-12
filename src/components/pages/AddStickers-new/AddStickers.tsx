import { FC } from 'react';
import { useSelector } from 'react-redux';

import { NewSticker } from '../../NewSticker-new/NewSticker';
import { IStickersState } from '../../../interfaces/IStickersState';
import { Container, TitlePage } from '../../UI';
import { addpage } from '../../../utils/content/stickerspage';
import styles from './AddStickers.module.scss';


export const AddStickersNew: FC = () => {
  const { stickers } = useSelector((state: { stickers: IStickersState }) => state.stickers);

  return (
    <main className={styles.add}>
      <Container className={styles.add_container}>
        <TitlePage type='main-title'>{addpage.title}</TitlePage>
        <section className={styles.cards}>
          {
            stickers.map((card) => (
              <NewSticker key={card.id} sticker={card} />
            ))
          }

        </section>
      </Container>
    </main>
  );
};
