import { PageElement } from '../../utils/calculateStickerOnList';
import { ISticker } from './ISticker';

export interface IStickersState {
  loading: boolean;
  error: boolean;
  stickers: ISticker[];
  pages: PageElement[][];
}
