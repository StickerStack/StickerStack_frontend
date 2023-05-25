export interface ICard {
  image: string;
  shape: 'square' | 'rounded-square' | 'circle' | 'contour';
  amount: number;
  size: {
    width: number;
    height: number;
  };
  id: number;
}
