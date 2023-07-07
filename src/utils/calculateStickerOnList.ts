import { ICard } from "../interfaces";


const sortArrayICard = (arr: Array<ICard>): Array<ICard> => {
  return [...arr].sort((card1, card2) => {
    const card1Area = card1.size.width * card1.size.height;
    const card2Area = card2.size.width * card2.size.height;

    if (card1Area < card2Area) {
      return -1;
    } else if (card1Area > card2Area) {
      return 1;
    } else {
      return 0;
    }
  });
}

// Принимает массив с ICard и возвращает обновленный массив с ICard amount
// Если стикеры все уместились возвращается пустой массив
export const calculateStickerOnList = (arr: ICard[]): ICard[] => {
  const element = document.createElement('div');
  element.className = 'listCalculate';
  document.body.appendChild(element);
  element.innerHTML = '';
  element.style.cssText = `
    background-color: gray;
    padding: 40px 40px;
    border: 1px solid black;
    display: flex; 
    flex-wrap: wrap; 
    width: 2480px; 
    height: 3508px; 
    box-sizing: border-box;
    gap: 20px 22px;
    align-content: flex-start;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  `;

  const sortedArray = sortArrayICard(arr);

  for (let i = 0; i < sortedArray.length; i++) {
    const objCopy = { ...sortedArray[i] };
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

        if (sortedArray.length === 1) {
          return [objCopy];
        }

        return [objCopy, ...sortedArray.slice(i + 1, sortedArray.length)];
      }

      objCopy.amount -= 1;
    }
  }
  document.body.removeChild(document.body.querySelector('.listCalculate') as HTMLDivElement);
  return [];
}