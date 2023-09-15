import { PageElement } from "../utils/calculateStickerOnList";
import { ISticker } from "./ISticker";

export interface IStickersState {
  stickers: ISticker[],
  pages: PageElement[][],
}