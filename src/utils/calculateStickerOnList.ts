import { sortArrayICard } from './sortArrayICard';
import { ICard } from '../interfaces';

export interface IOptions {
  widthPage: number;
  heightPage: number;
  paddingList: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  gapX: number;
  gapY: number;
}

// Принимает массив с ICard и возвращает обновленный массив с ICard amount
// Если стикеры все уместились возвращается пустой массив
export const calculateStickerOnList = (arr: ICard[], options: IOptions): ICard[] => {
  const element = document.createElement('div');
  element.className = 'listCalculate';
  document.body.appendChild(element);
  element.innerHTML = '';
  element.style.cssText = `
    background-color: gray;
    padding: ${options.paddingList.top}px ${options.paddingList.right}px ${options.paddingList.bottom}px ${options.paddingList.left}px;
    border: 1px solid black;
    display: flex; 
    flex-wrap: wrap; 
    width: ${options.widthPage}px; 
    height: ${options.heightPage}px; 
    box-sizing: border-box;
    gap: ${options.gapX}px ${options.gapY}px;
    align-content: flex-start;
    justify-content: center;
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
        object-fit: contain;  
      `;
      element.appendChild(img);

      if (hasOverflowed && element.lastElementChild) {
        element.removeChild(element.lastElementChild);
        element.removeChild(element.lastElementChild);
        document.body.removeChild(document.body.querySelector('.listCalculate') as HTMLDivElement);
        const currentList = [objCopy, ...arr.slice(i + 1, arr.length)];

        const allLists: ICard[][] = JSON.parse(localStorage.getItem('lists') as string) as ICard[][] || [];
        localStorage.setItem('lists', JSON.stringify([...allLists, currentList]));

        return currentList;
      }

      objCopy.amount -= 1;
    }
  }
  document.body.removeChild(document.body.querySelector('.listCalculate') as HTMLDivElement);
  return [];
};
