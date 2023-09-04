import { TCardShape } from './ICard';

export interface ISticker {
  image: string;
  shape: TCardShape;
  amount: number;
  size: {
    width: number;
    height: number;
  };
  optimalSize: {
    width: number;
    height: number;
  };
  id: string;
  active?: boolean;
  valid: boolean;
}

export interface IServerSticker {
  amount: number;
  image: string;
  shape: TCardShape;
  height: number;
  width: number;
  id: string;
}

// https://scriptdev.ru/guide/045/#omit-t-k  -- если будут вопросы по типу Omit
export type IUploadSticker = Omit<IServerSticker, 'id'>;
