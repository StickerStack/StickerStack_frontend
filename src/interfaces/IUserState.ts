import { IOrderState } from './IOrderState';

export interface IUserState {
  email: string;
  isLogged: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  orders: Array<IOrderState>;
  isVerified: boolean;
}
