import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICard } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { CartState } from '../interfaces/CartState';

const initialState: CartState = {
  items: [
    {
      image: '',
      shape: 'rounded-square',
      amount: 5,
      size: { width: 5, height: 5 },
      id: generateRandomNumber(),
    },
  ],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItems(state, action: { payload: ICard; type: string }) {
      state.items.push({ ...action.payload });
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
