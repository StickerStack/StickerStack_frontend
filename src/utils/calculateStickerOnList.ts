import { ICard, IOptions } from '../interfaces';
import { sortArrayICard } from './sortArrayICard';

export const calculateStickerOnList = (arr: ICard[], options: IOptions): void => {
  const page = document.createElement('div');
  page.className = 'pageWithStickers';
  document.body.appendChild(page);
  page.innerHTML = '';
  page.style.cssText = `
    background-color: gray;
    width: ${options.widthPage}px;
    height: ${options.heightPage}px;
    max-height: ${options.heightPage}px;
    padding: ${options.paddingList.top}px ${options.paddingList.right}px ${options.paddingList.bottom}px ${
    options.paddingList.left
  }px;
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(${Math.floor(options.widthPage)}, 1px);
    grid-template-rows: repeat(${Math.floor(options.heightPage)}, 1px);
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  `;
  const allPages = [];
  let currentPage = [];

  const sortedArray = sortArrayICard(arr).map((card) => JSON.parse(JSON.stringify(card)));

  for (let i = 0; i < sortedArray.length; i++) {
    const imageObject = JSON.parse(JSON.stringify(sortedArray[i]));
    for (let j = 0; j < sortedArray[i].amount; j++) {
      const images = document.createElement('img');
      images.src = sortedArray[i].image;
      images.className = 'sticker';
      images.width = sortedArray[i].size.width;
      images.height = sortedArray[i].size.height;
      images.style.cssText = `
        object-fit: cover;
        grid-row: span ${Math.ceil(sortedArray[i].size.height + options.gapY)};
        grid-column: span ${Math.ceil(sortedArray[i].size.width + options.gapX)};
      `;
      page.appendChild(images);
      const hasOverflowed = page.scrollHeight > page.clientHeight;

      if (hasOverflowed) {
        if (j === sortedArray[i].amount - 2) {
          allPages.push(currentPage);
          
        }
        localStorage.setItem('pagesWithStickers', JSON.stringify(allPages));
        allPages.push(currentPage);
        currentPage = [];
        page.innerHTML = '';
        j--;
      } else {
        currentPage.push(imageObject);
        imageObject.amount -= 1;
      }
    }
  }
  allPages.push(currentPage);
  localStorage.setItem('pagesWithStickers', JSON.stringify(allPages));
  document.body.removeChild(page)
  console.log(allPages);
};
