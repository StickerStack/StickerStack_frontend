import { TShape } from "../types/TShape";

export interface ISticker {
  id: string,
  image: string,
  shape: TShape,
  amount: number,
  width: number,
  height: number,
  optimal_width: number,
  optimal_height: number
}

export type IStickerForOrder = Omit<ISticker, 'id'>;