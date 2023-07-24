import { ICard } from "../interfaces";
import { IOptions, calculateStickerOnList } from "./calculateStickerOnList";
import { sortArrayICard } from "./sortArrayICard";

export const calculateLists = (arr: ICard[], options: IOptions): number => {
  let lists = 1;
  const sortedArray = sortArrayICard(arr);

  function recursiveCalculate(arr: ICard[], options: IOptions) {
    arr = calculateStickerOnList(arr, options);
    if (arr.length > 0) {
      recursiveCalculate(arr, options);
      lists++;
    }
  }

  recursiveCalculate(sortedArray, options);

  return lists;
}