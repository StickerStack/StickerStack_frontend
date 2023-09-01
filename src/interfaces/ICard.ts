export type TCardShape = 'square' | 'rounded_square' | 'circle' | 'contour';
export interface ICard {
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
