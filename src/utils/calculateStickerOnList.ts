import { ICard, IOptions } from '../interfaces';

export interface PageElement {
  card: ICard;
  count: number;
}

export const calculateStickerOnList = (arr: ICard[], options: IOptions): PageElement[][] => {
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
  let currentPage: PageElement[] = [];

  for (let i = 0; i < arr.length; i++) {
    const imageObject = JSON.parse(JSON.stringify(arr[i]));
    let pageElement = { card: imageObject, count: 0 };
    while (imageObject.amount > 0) {
      const images = document.createElement('img');
      images.className = 'sticker';
      images.width = imageObject.size.width;
      images.height = imageObject.size.height;
      images.style.cssText = `
        object-fit: cover;
        grid-row: span ${Math.ceil(imageObject.size.height + options.gapY)};
        grid-column: span ${Math.ceil(imageObject.size.width + options.gapX)};
      `;
      page.appendChild(images);
      
      const hasOverflowed = page.scrollHeight > page.clientHeight;

      if (hasOverflowed) {
        currentPage.push(pageElement);
        allPages.push(currentPage);
        pageElement = { card: imageObject, count: 0 };
        currentPage = [];
        page.innerHTML = '';
      } else {
        imageObject.amount -= 1;
        pageElement.count += 1;
      }
    }
    currentPage.push(pageElement);
  }

  allPages.push(currentPage);
  document.body.removeChild(page);
  return allPages;
};
