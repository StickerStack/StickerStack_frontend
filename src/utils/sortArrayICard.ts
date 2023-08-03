import { ICard } from "../interfaces";

export const sortArrayICard = (arr: ICard[]): ICard[] => {
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
};
