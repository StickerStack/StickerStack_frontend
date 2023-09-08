import { PageElement } from '../utils/calculateStickerOnList';
import { ICard } from './';

export interface ICardsState {
  cards: Array<ICard>;
  valid: boolean;
  processing?: boolean;
  prewiewCards: PageElement[][];
}
