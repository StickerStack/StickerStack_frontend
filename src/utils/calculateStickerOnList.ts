import { ICard, IOptions } from '../interfaces';

// Принимает массив с ICard и возвращает обновленный массив с ICard amount
// Если стикеры все уместились возвращается пустой массив
export const calculateStickerOnList = (arr: ICard[], options: IOptions): ICard[] => {
  const element = document.createElement('div');
  element.className = 'listCalculate';
  document.body.appendChild(element);
  element.innerHTML = '';
  element.style.cssText = `
    background-color: gray;
    width: ${options.widthPage}px;
    height: ${options.heightPage}px;
    max-height: ${options.heightPage}px;
    padding: ${options.paddingList.top}px ${options.paddingList.right}px ${
    options.paddingList.bottom
  }px ${options.paddingList.left}px;
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

  for (let i = 0; i < arr.length; i++) {
    const objCopy = { ...arr[i] };
    const amount = objCopy.amount;
    for (let j = 0; j < amount; j++) {
      const img = document.createElement('img');
      const hasOverflowed = element.scrollHeight > element.clientHeight;

      img.src = objCopy.image;
      img.width = objCopy.size.width;
      img.height = objCopy.size.height;
      img.style.cssText = `
        object-fit: cover;
        grid-row: span ${Math.ceil(objCopy.size.height + options.gapY)};
        grid-column: span ${Math.ceil(objCopy.size.width + options.gapX)};
      `;
      element.appendChild(img);

      if (hasOverflowed && element.lastElementChild) {
        element.removeChild(element.lastElementChild);
        element.removeChild(element.lastElementChild);
        document.body.removeChild(document.body.querySelector('.listCalculate') as HTMLDivElement);
        const currentList = [objCopy, ...arr.slice(i + 1, arr.length)];

        const allLists: ICard[][] =
          (JSON.parse(localStorage.getItem('lists') as string) as ICard[][]) || [];
        localStorage.setItem('lists', JSON.stringify([...allLists, currentList]));

        return currentList;
      }

      objCopy.amount -= 1;
    }
  }
  document.body.removeChild(document.body.querySelector('.listCalculate') as HTMLDivElement);
  return [];
};
