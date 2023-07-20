import { CartItem } from './';

export interface CartState {
  cost: number;
  address: string;
  number_of_sheets: number;
  cropping: boolean;
  items: Array<CartItem>;
}
