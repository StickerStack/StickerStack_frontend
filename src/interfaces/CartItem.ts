import { TCardShape } from './ICard';

export interface CartItem {
  image: string;
  shape: TCardShape;
  amount: number;
  size: {
    width: number;
    height: number;
  };
  id: number;
}
