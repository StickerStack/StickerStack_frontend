import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICard, ICardsState } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { api } from '../utils/api';

const initialState: ICardsState = {
  cards: [
    {
      image: '',
      shape: 'square',
      amount: 1,
      size: { width: 0, height: 0 },
      id: generateRandomNumber(),
    },
  ],
};

const removeBackground = createAsyncThunk(
  'auth/removeBackground',
  async (data: { data: FormData; id: number }, { rejectWithValue }) => {
    try {
      const response = await api.removeBackground(data.data);
      return { data: response.data, id: data.id };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
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
    updateCard(state, action) {
      const { id, updatedCard } = action.payload;
      const indexCard = state.cards.findIndex((card) => card.id === id);

      if (indexCard !== -1) {
        state.cards[indexCard] = updatedCard;
      }
    },
    updatePicture(state, action: { payload: { id: number; image: string }; type: string }) {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          card.image = action.payload.image;
        }
        return card;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeBackground.fulfilled, (state, action) => {
      console.log(
        '%ccardsSlice.ts line:62 action.payload',
        'color: #007acc;',
        action.payload.data,
        action.payload.id,
      );
    });
  },
});

const cardsSliceReducer = cardsSlice.reducer;
const { addCard, deleteCard, updatePicture, updateCard } = cardsSlice.actions;

export { cardsSliceReducer, addCard, deleteCard, updatePicture, removeBackground, updateCard };
