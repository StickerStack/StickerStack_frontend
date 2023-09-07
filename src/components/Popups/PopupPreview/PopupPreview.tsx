import Slider from 'react-slick';
import { useState, useEffect } from 'react';

import { StickerList } from '../../StickerList/StickerList';
import { PageElement, calculateStickerOnList } from '../../../utils/calculateStickerOnList';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

import { useSelector } from 'react-redux';
import { ICardsState } from '../../../interfaces';
import { pageSizePx } from '../../../utils/constants';
import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';


const PopupPreview: React.FC = () => {
  const { prewiewCards } = useSelector((state: { cards: ICardsState }) => state.cards);


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Так будет выглядеть набор на листе</h2>
      {prewiewCards.length > 0 && (
        <Slider
          {...settings}
          customPaging={(i: number) => {
            return (
              <span className={styles.page_numbers}>
                {i + 1}/{prewiewCards.length}
              </span>
            );
          }}
        >
          {prewiewCards.map((elementsPage) => {
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
