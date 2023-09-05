import { TCardShape } from './ICard';

export interface ISticker {
  amount: number;
  image: string;
  shape: TCardShape;
  height: number;
  width: number;
  id?: string;
}
