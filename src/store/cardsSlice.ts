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
      size: { width: 0, height: 0 },
      optimalSize: { width: 0, height: 0 },
      id: `${generateRandomNumber()}`,
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
    setActive(state, action: { payload: string; type: string }) {
      state.cards = state.cards.map((card) => {
        if (card.id !== action.payload) {
          card.active = false;
        } else card.active = true;
        return card;
      });
    },
    setValid(state, action: { payload: { id: string; valid: boolean }; type: string }) {
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
    deleteCard(state, action: { payload: string; type: string }) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      if (state.cards.length === 0) {
        state.cards = [
          {
            image: '',
            shape: 'square',
            amount: 1,
            size: { width: 0, height: 0 },
            optimalSize: { width: 0, height: 0 },
            id: `${generateRandomNumber()}`,
            active: true,
            valid: false,
          },
        ];
      }
    },
    cleanCards(state) {
      state.cards = initialState.cards;
      state.valid = initialState.valid;
    },
    updateCard(state, action) {
      const { id, updatedCard } = action.payload;
      const indexCard = state.cards.findIndex((card) => card.id === id);

      if (indexCard !== -1) {
        state.cards[indexCard] = updatedCard;
      }
    },
    updateShape(state, action: { payload: { id: string; shape: TCardShape }; type: string }) {
      const { id, shape } = action.payload;
      const indexCard = state.cards.find((card) => card.id === id);

      if (indexCard) {
        indexCard.shape = shape;
      }
    },
    updateAmount(state, action: { payload: { id: string; amount: number }; type: string }) {
      const { id, amount } = action.payload;
      const indexCard = state.cards.find((card) => card.id === id);

      if (indexCard) {
        indexCard.amount = amount;
      }
    },
    updatePicture(
      state,
      action: {
        payload: {
          id: string;
          image: string;
          size: { width: number; height: number };
          optimalSize: { width: number; height: number };
        };
        type: string;
      },
    ) {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          card.image = action.payload.image;
          card.size = action.payload.size;
          card.optimalSize = action.payload.optimalSize;
        }
        return card;
      });
    },
    updateSize(
      state,
      action: { payload: { id: string; width: number; height: number }; type: string },
    ) {
      const { id, width, height } = action.payload;
      const foundCard = state.cards.find((card) => card.id === id);

      if (foundCard) {
        foundCard.size.width = width;
        foundCard.size.height = height;
      }
    },

    setCardsFromCart(state, action) {
      const newCards = action.payload.map((card: any, index: number) => {
        const newCard: ICard = {
          image: card.image,
          shape: card.shape,
          amount: card.amount,
          size: { width: card.width, height: card.height },
          optimalSize: { width: 27, height: 27 },
          id: card.id,
          active: false,
          valid: false,
        };
        newCard.active = false;

        if (index === 0) {
          newCard.active = true;
        }

        return { ...newCard };
      });
      state.cards = newCards;
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
  cleanCards,
  setActive,
  setValid,
  checkValidation,
  updatePicture,
  updateCard,
  updateShape,
  updateAmount,
  updateSize,
  setCardsFromCart,
} = cardsSlice.actions;

export {
  cardsSliceReducer,
  addCard,
  deleteCard,
  cleanCards,
  setActive,
  setValid,
  checkValidation,
  updatePicture,
  updateShape,
  updateAmount,
  removeBackground,
  updateCard,
  updateSize,
  setCardsFromCart,
};
