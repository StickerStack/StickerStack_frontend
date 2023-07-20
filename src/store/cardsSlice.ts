import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCardShape } from '../interfaces/ICard';
import { ICard, ICardsState } from '../interfaces';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { api } from '../utils/api/Api';

const initialState: ICardsState = {
  cards: [
    {
      image: '',
      shape: 'square',
      amount: 1,
      size: { width: 2, height: 2 },
      id: generateRandomNumber(),
      active: true,
      valid: false,
    },
  ],
  valid: false,
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
    setActive(state, action: { payload: number; type: string }) {
      state.cards = state.cards.map((card) => {
        if (card.id !== action.payload) {
          card.active = false;
        } else card.active = true;
        return card;
      });
    },
    setValid(state, action: { payload: { id: number; valid: boolean }; type: string }) {
      const { id, valid } = action.payload;
      const indexCard = state.cards.find((card) => card.id === id);

      if (valid === true && indexCard) {
        indexCard.valid = true;
      } else if (valid === false && indexCard) {
        indexCard.valid = false;
      }
    },
    checkValidation(state) {
      const indexCard = state.cards.find((card) => card.valid === false);

      if (indexCard) {
        state.valid = false;
      } else state.valid = true;
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
    updateShape(state, action: { payload: { id: number; shape: TCardShape }; type: string }) {
      const { id, shape } = action.payload;
      const indexCard = state.cards.find((card) => card.id === id);

      if (indexCard) {
        indexCard.shape = shape;
      }
    },
    updateAmount(state, action: { payload: { id: number; amount: number }; type: string }) {
      const { id, amount } = action.payload;
      const indexCard = state.cards.find((card) => card.id === id);

      if (indexCard) {
        indexCard.amount = amount;
      }
    },
    updatePicture(
      state,
      action: {
        payload: { id: number; image: string; size: { width: number; height: number } };
        type: string;
      },
    ) {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          card.image = action.payload.image;
          card.size = action.payload.size;
        }
        return card;
      });
    },
    updateSize(
      state,
      action: { payload: { id: number; width: number; height: number }; type: string },
    ) {
      const { id, width, height } = action.payload;
      const foundCard = state.cards.find((card) => card.id === id);

      if (foundCard) {
        foundCard.size.width = width;
        foundCard.size.height = height;
      }
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
const {
  addCard,
  deleteCard,
  setActive,
  setValid,
  checkValidation,
  updatePicture,
  updateCard,
  updateShape,
  updateAmount,
  updateSize,
} = cardsSlice.actions;

export {
  cardsSliceReducer,
  addCard,
  deleteCard,
  setActive,
  setValid,
  checkValidation,
  updatePicture,
  updateShape,
  updateAmount,
  removeBackground,
  updateCard,
  updateSize,
};
