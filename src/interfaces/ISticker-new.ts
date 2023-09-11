import { TShape } from "../types/TShape";

export interface ISticker {
  id: number,
  image: string,
  shape: TShape,
  amount: number,
  width: number,
  height: number,
  optimal_width: number,
  optimal_height: number
}