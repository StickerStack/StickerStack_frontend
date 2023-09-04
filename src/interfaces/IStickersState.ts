import { ISticker } from "./ISticker-new";

export interface IStickersState {
  items: ISticker[];
  valid: boolean,
  processing: boolean,
}