import { IOptions, ICard } from '../interfaces';
import { sortArrayICard } from './sortArrayICard';

export const calculateLists = (arr: ICard[], options: IOptions): number => {
  let lists = 1;
  const sortedArray = sortArrayICard(arr);

  function recursiveCalculate(arr: ICard[], options: IOptions) {
    // arr = calculateStickerOnList(arr, options);

    if ( arr.length === 1 ) {
      return;
    }

    recursiveCalculate(arr, options);
    lists++;
  }

  recursiveCalculate(sortedArray, options);

  return lists;
};
