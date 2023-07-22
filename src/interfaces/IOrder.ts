interface IStatus {
  id: number;
  status: string;
  date: string;
}

export interface IOrder {
  id: number;
  delivery: { status: string; statuses: Array<IStatus> };
  cost: number;
  amount: number;
  number_of_sheets: number;
  stickers: number;
}
