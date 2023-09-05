import { ICard } from './';

export interface ICardsState {
  cards: Array<ICard>;
  valid: boolean;
  processing?: boolean;
}
