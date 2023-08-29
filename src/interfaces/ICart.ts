import { ISticker } from './ISticker';

export interface ICart {
  cost: number;
  totalAmount: number;
  address: string;
  number_of_sheets: number;
  cropping: boolean;
  items: Array<ISticker>;
}
