import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../interfaces/CartState';
import { ICard } from '../interfaces';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItems(state, action: { payload: Array<ICard>; type: string }) {
      state.items.push(...action.payload);
    },
    addItem(state, action: { payload: ICard; type: string }) {
      state.items.push({ ...action.payload });
    },
    deleteItem(state, action: { payload: number; type: string }) {
      state.items = state.items.filter((card) => card.id !== action.payload);
    },
    updateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const indexCard = state.items.findIndex((card) => card.id === id);
    },
  },
});

const cartSliceReducer = cartSlice.reducer;
const { addItem, deleteItem, updateItem } = cartSlice.actions;

export { cartSliceReducer, addItem, deleteItem, updateItem };
