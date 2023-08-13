import Slider from 'react-slick';
import { useState, useEffect } from 'react';

import { StickerList } from '../../StickerList/StickerList';

import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';
import { ICard } from '../../../interfaces';
import { PageElement } from '../../../utils/calculateStickerOnList';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

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
      <h2 className={styles.title}>Так будет выглядеть набор на листе</h2>
      {/* <Slider {...settings}>
        { pagesCards.length > 0 &&
          pagesCards.map((cards, i) => (
            <StickerList key={i} cards={cards} />   
          ))
        }
      </Slider> */}

      {pagesCards.length > 0 &&
        pagesCards.map((elementsPage) => {
          const cards =  [];
          for(let i = 0; i < elementsPage.length; i++) {
            for(let j = 0; j < elementsPage[i].count; j++) {
              cards.push(elementsPage[i].card);
            }
          }
          return (
            <StickerList key={generateRandomNumber()} cards={cards} />
          )
        })}
    </div>
  );
};

export { PopupPreview };
