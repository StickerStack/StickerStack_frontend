import { ISticker } from "./ISticker";

export interface IOrder {
  order_number: number;
  cost: number;
  address: string;
  number_of_sheets: number;
  cropping: boolean;
  created_at: string;
  status: string;
  stickers: Array<ISticker>;
}
