import { TCardShape } from './ICard';

export interface OrderItem {
  image: string;
  shape: TCardShape;
  amount: number;
  width: number;
  height: number;
}
