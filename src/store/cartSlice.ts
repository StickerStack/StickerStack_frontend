import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../interfaces/CartState';
import { CartItem } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';

const initialState: CartState = {
  cost: 0,
  address: '',
  number_of_sheets: 0,
  cropping: false,
  items: [
    {
      image: '',
      shape: 'square',
      amount: 1,
      size: { width: 0, height: 0 },
      id: generateRandomNumber(),
    },
  ],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItems(state, action: { payload: Array<CartItem>; type: string }) {
      state.items.push(...action.payload);
    },
    addItem(state, action: { payload: CartItem; type: string }) {
      state.items.push({ ...action.payload });
    },
    deleteItem(state, action: { payload: number; type: string }) {
      state.items = state.items.filter((card) => card.id !== action.payload);
    },
    updateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const indexCard = state.items.findIndex((card) => card.id === id);
    },
    updateCropping(state, action) {
      state.cropping = action.payload;
    },
  },
});

const cartSliceReducer = cartSlice.reducer;
const { addItem, deleteItem, updateItem, updateCropping } = cartSlice.actions;

export { cartSliceReducer, addItem, deleteItem, updateItem, updateCropping };
