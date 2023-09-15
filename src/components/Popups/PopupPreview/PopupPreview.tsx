import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import { StickerList } from '../../StickerList/StickerList';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { TooltipCustom } from '../../UI';
import { IStickersState } from '../../../interfaces/IStickersState';
import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';

const PopupPreview: React.FC = () => {
  const { pages } = useSelector((state: { stickers: IStickersState }) => state.stickers);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Так будет выглядеть набор на{' '}
        {pages.length.toString().endsWith('1') && !pages.length.toString().endsWith('11')
          ? 'листе'
          : 'листах'}
        <TooltipCustom
          text='Учитывайте, что данные изображения предоставляются для ознакомления с приблизительным видом
        листов и могут иметь искажения в зависимости от используемого монитора. Окончательные макеты
        будут тщательно проработаны нашими специалистами перед отправкой в печать.'
        />
      </h2>
      {pages.length > 0 && (
        <Slider
          {...settings}
          customPaging={function (i: number) {
            return (
              <span className={styles.page_numbers}>
                {i + 1}/{pages.length}
              </span>
            );
          }}
        >
          {pages.map((elementsPage) => {
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
