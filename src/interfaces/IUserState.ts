import { IOrder } from './IOrder';

export interface IUserState {
  email: string;
  isLogged: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  orders: Array<IOrder>;
  ordersAlert: number;
  isVerified: boolean;
}
