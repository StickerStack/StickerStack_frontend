import Slider from 'react-slick';
import { useState, useEffect } from 'react';

import { StickerList } from '../../StickerList/StickerList';
import { PageElement } from '../../../utils/calculateStickerOnList';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';

const PopupPreview: React.FC = () => {
  const [pagesCards, setPagesCards] = useState<PageElement[][]>([]);

  useEffect(() => {
    const pages = localStorage.getItem('pagesWithStickers');
    if (pages) {
      setPagesCards(JSON.parse(pages));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Так будет выглядеть набор на{' '}
        {pagesCards.length.toString().endsWith('1') && !pagesCards.length.toString().endsWith('11')
          ? 'листе'
          : 'листах'}
      </h2>
      {pagesCards.length > 0 && (
        <Slider {...settings}>
          {pagesCards.map((elementsPage) => {
            const cards = [];
            for (let i = 0; i < elementsPage.length; i++) {
              for (let j = 0; j < elementsPage[i].count; j++) {
                cards.push(elementsPage[i].card);
              }
            }
            return <StickerList key={generateRandomNumber()} cards={cards} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export { PopupPreview };
