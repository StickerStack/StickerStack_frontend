import { createSlice } from '@reduxjs/toolkit';
import { ICard, ICardsState } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';

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

export { cardsSliceReducer, addCard, deleteCard, updatePicture };
