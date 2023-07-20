export type TCardShape = 'square' | 'rounded-square' | 'circle' | 'contour';
export interface ICard {
  image: string;
  shape: TCardShape;
  amount: number;
  size: {
    width: number;
    height: number;
  };
  id: number;
  active?: boolean;
  valid: boolean;
}
