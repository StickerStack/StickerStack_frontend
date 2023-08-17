import { TCardShape } from './ICard';

interface Sticker {
  amount: number;
  image: string;
  shape: TCardShape;
  height: number;
  width: number;
}

export interface IOrderState {
  order_number: number;
  cost: number;
  address: string;
  number_of_sheets: number;
  cropping: boolean;
  created_at: string;
  stickers: Array<Sticker>;
}

// Мок заказа
//interface IStatus {
//   id: number;
//   status: string;
//   date: string;
// }

// export interface IOrderStateMock {
//   order_id: number;
//   delivery: { status: string; statuses: Array<IStatus> };
//   cost: number;
//   amount: number;
//   number_of_sheets: number;
//   stickers: number;
// }
