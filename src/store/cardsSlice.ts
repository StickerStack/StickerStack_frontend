import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICard, ICardsState } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { api } from '../utils/api';

const initialState: ICardsState = {
  cards: [
    {
      image: '',
      shape: 'square',
      amount: 0,
      size: { width: 0, height: 0 },
      id: generateRandomNumber(),
    },
  ],
};

const removeBackground = createAsyncThunk(
  'auth/removeBackground',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await api.removeBackground(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    addCard(state, action: { payload: ICard; type: string }) {
      state.cards.push({ ...action.payload });
    },
    deleteCard(state, action: { payload: number; type: string }) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    updatePicture(
      state,
      action: { payload: { id: number; image: string }; type: string }
    ) {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          card.image = action.payload.image;
        }
        return card;
      })
    },
  },
});

const cardsSliceReducer = cardsSlice.reducer;
const { addCard, deleteCard, updatePicture } = cardsSlice.actions;

export { cardsSliceReducer, addCard, deleteCard, updatePicture, removeBackground };
