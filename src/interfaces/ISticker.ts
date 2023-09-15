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

export interface IStickerForOrder {
  image: string,
  shape: TShape,
  amount: number,
  width: number,
  height: number,
}