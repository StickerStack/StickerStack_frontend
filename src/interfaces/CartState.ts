import { CartItem } from './';

export interface CartState {
  cost: number;
  totalAmount: number;
  address: string;
  number_of_sheets: number;
  cropping: boolean;
  items: Array<CartItem>;
}
