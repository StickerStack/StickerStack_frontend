import cn from 'classnames';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

import { useAppDispatch } from '../../hooks/hooks';
import { openMessage } from '../../store/popupSlice';
import { messages } from '../../utils/content/popups';
import { converter } from '../../utils/converter';
import { pageSizePx, stickerWhiteBorder } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { IStickersState } from '../../interfaces';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import { ButtonWithText } from '../UI';
import { useState } from 'react';

import styles from './PreviewForDownLoad.module.scss';

export const pageSizePxOptimal = {
  widthPage: pageSizePx.widthPage * 3.11,
  heightPage: pageSizePx.heightPage * 3.11,
  paddingList: {
    top: pageSizePx.paddingList.top * 3.11,
    right: pageSizePx.paddingList.right * 3.11,
    bottom: pageSizePx.paddingList.bottom * 3.11,
    left: pageSizePx.paddingList.left * 3.11,
  },
  gapX: pageSizePx.gapX * 3.11,
  gapY: pageSizePx.gapY * 3.11,
};
const PreviewForDownLoad: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const borderInPx = converter.mmToPx(stickerWhiteBorder);
  const { pages } = useSelector((state: { stickers: IStickersState }) => state.stickers);

  const handleDownload = async () => {
    await setLoading(true);
    const elements = document.querySelectorAll<HTMLElement>('.page');
    if (!elements) return;
    async function download() {
      elements.forEach(async (element) => {
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL('image/jpeg');
        if (element.classList.contains('red-line')) {
          downloadjs(dataURL, 'crop.jpeg', 'image/jpeg');
        } else downloadjs(dataURL, 'stickers.jpeg', 'image/jpeg');
      });
    }
    download()
      .catch(() =>
        dispatch(
          openMessage({
            text: `${messages.somethingWrong}`,
            isError: true,
          }),
        ),
      )
      .finally(() => setTimeout(() => setLoading(false), 2000));
  };

  return (
    <main className={styles.page}>
      <ButtonWithText className={styles.button} onClick={handleDownload} loading={loading}>
        Скачать макеты
      </ButtonWithText>

      {pages.map((elementsPage) => {
        const cards = [];
        for (let i = 0; i < elementsPage.length; i++) {
          for (let j = 0; j < elementsPage[i].count; j++) {
            cards.push(elementsPage[i].card);
          }
        }
        return (
          <>
            <div
              key={generateRandomNumber()}
              className={cn(styles.container + ' page')}
              style={{
                width: pageSizePxOptimal.widthPage,
                height: pageSizePxOptimal.heightPage,
                padding: `${pageSizePxOptimal.paddingList.top}px ${pageSizePxOptimal.paddingList.right}px ${pageSizePxOptimal.paddingList.bottom}px ${pageSizePxOptimal.paddingList.left}px`,
                gridTemplateColumns: `repeat(${Math.floor(pageSizePxOptimal.widthPage)}, 1px)`,
                gridTemplateRows: `repeat(${Math.floor(pageSizePxOptimal.heightPage)}, 1px)`,
              }}
            >
              {cards.map((card, index) => {
                if (card.id === 'newSticker') {
                  return null;
                }

                return (
                  <div
                    className={cn(styles.border, styles[`border_${card.shape}`])}
                    style={{
                      width: converter.cmToPx(card.width) * 3.11,
                      height: converter.cmToPx(card.height) * 3.11,
                      padding: borderInPx * 3.11,
                      gridRow: `span ${Math.ceil(
                        converter.cmToPx(card.height) * 3.11 + pageSizePxOptimal.gapY,
                      )}`,
                      gridColumn: `span ${Math.ceil(
                        converter.cmToPx(card.width) * 3.11 + pageSizePxOptimal.gapX,
                      )}`,
                    }}
                    key={`${card.id}${index}`}
                  >
                    <img
                      className={cn(styles.image, styles[`image_${card.shape}`])}
                      src={
                        card.image.startsWith('data:image/png;base64,')
                          ? card.image
                          : `data:image/png;base64,${card.image}`
                      }
                    />
                  </div>
                );
              })}
            </div>

            <div
              key={generateRandomNumber()}
              className={cn(styles.container + ' page red-line')}
              style={{
                width: pageSizePxOptimal.widthPage,
                height: pageSizePxOptimal.heightPage,
                padding: `${pageSizePxOptimal.paddingList.top}px ${pageSizePxOptimal.paddingList.right}px ${pageSizePxOptimal.paddingList.bottom}px ${pageSizePxOptimal.paddingList.left}px`,
                gridTemplateColumns: `repeat(${Math.floor(pageSizePxOptimal.widthPage)}, 1px)`,
                gridTemplateRows: `repeat(${Math.floor(pageSizePxOptimal.heightPage)}, 1px)`,
              }}
            >
              {cards.map((card, index) => {
                if (card.id === 'newSticker') {
                  return null;
                }

                return (
                  <div
                    className={cn(styles.border, styles.border_red, styles[`border_${card.shape}`])}
                    style={{
                      width: converter.cmToPx(card.width) * 3.11,
                      height: converter.cmToPx(card.height) * 3.11,
                      padding: borderInPx * 3.11,
                      gridRow: `span ${Math.ceil(
                        converter.cmToPx(card.height) * 3.11 + pageSizePxOptimal.gapY,
                      )}`,
                      gridColumn: `span ${Math.ceil(
                        converter.cmToPx(card.width) * 3.11 + pageSizePxOptimal.gapX,
                      )}`,
                    }}
                    key={`${card.id}${index}`}
                  />
                );
              })}
            </div>
          </>
        );
      })}
    </main>
  );
};

export { PreviewForDownLoad };
