import { ICard, IOptions } from '../interfaces';
import { sortArrayICard } from './sortArrayICard';
// не используется 
export const calculateStickerOnList = (arr: ICard[], options: IOptions): void => {
  const pages: ICard[][] = [];
  let currentPage: ICard[] = [];
  let currentPageWidth = 0;
  let currentPageHeight = 0;
  const sortedArray = sortArrayICard(arr);

  for (const card of sortedArray) {
    const updatedCard = { ...card, amount: 1 }; // Update the amount property to 1
    for (let i = 0; i < card.amount; i++) {
      const cardWidthPx = updatedCard.size.width;
      const cardHeightPx = updatedCard.size.height;

      if (currentPageWidth + cardWidthPx + (currentPage.length > 0 ? options.gapX : 0) <= options.widthPage) {
        if (currentPage.length > 0) {
          currentPageWidth += options.gapX;
        }
        currentPage.push(updatedCard);
        currentPageWidth += cardWidthPx;
        currentPageHeight = Math.max(currentPageHeight, cardHeightPx);
      } else {
        if (currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = [];
          currentPageWidth = 0;
          currentPageHeight = 0;
        }

        while (currentPageHeight + cardHeightPx + options.gapY <= options.heightPage) {
          currentPage.push(updatedCard);
          currentPageWidth = cardWidthPx;
          currentPageHeight += cardHeightPx + options.gapY;
        }
      }
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  localStorage.setItem('pagesWithStickers', JSON.stringify(pages));
};
const canFitCard = (currentWidth: number, currentHeight: number, card: ICard, options: IOptions): boolean => {
  return currentWidth + card.size.width + options.gapX <= options.widthPage &&
         currentHeight + card.size.height + options.gapY <= options.heightPage;
};