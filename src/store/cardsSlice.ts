import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState: {
    cards: [{ image: '', shape: '', amount: '', size: '', id: 0 }],
  },
  reducers: {
    addCard(state, action) {
      state.cards.push({ ...action.payload });
    },
    deleteCard(state, action) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

const cardsSliceReducer = cardsSlice.reducer;
const { addCard, deleteCard } = cardsSlice.actions;

export { cardsSliceReducer, addCard, deleteCard };
