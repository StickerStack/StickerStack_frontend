import { useSelector } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICard, ICardsState } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { api } from '../utils/api';

const initialState: { items: ICard[] } = {
  items: [
    // {
    //   image: '',
    //   shape: 'rounded-square',
    //   amount: 5,
    //   size: { width: 5, height: 5 },
    //   id: generateRandomNumber(),
    // },
  ],
};

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
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

const cardsSliceReducer = cardsSlice.reducer;
const { addItem, deleteItem, updateItem } = cardsSlice.actions;

export { cardsSliceReducer, addItem, deleteItem, updateItem };
