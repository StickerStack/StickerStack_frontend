import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStickersState } from '../interfaces/IStickersState';
import { cartApi } from '../utils/api/CartApi';
import { IServerSticker, ISticker, IUploadSticker } from '../interfaces/ISticker-new';
import { TCardShape } from '../interfaces/ICard';
import { OrderItem } from '../interfaces';

export const initialState: IStickersState = {
  items: [
    {
      image: '',
      shape: 'square',
      amount: 1,
      size: { width: 0, height: 0 },
      optimalSize: { width: 0, height: 0 },
      id: '1',
      active: true,
      valid: false,
    },
  ],
  valid: false,
  processing: false,
};

export const addSticker = createAsyncThunk(
  'stickers/add_sticker',
  async (data: OrderItem, { rejectWithValue }) => {
    try {
      const response = await cartApi.addSticker(data);
      return { data: response.data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCart = createAsyncThunk('stickers/get_cart', async (data, { rejectWithValue }) => {
  try {
    return await cartApi.getCart();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteSticker = createAsyncThunk(
  'stickers/delete_sticker',
  async (data: string, { rejectWithValue }) => {
    try {
      await cartApi.deleteSticker(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// https://scriptdev.ru/guide/045/#omit-t-k  -- если будут вопросы по типу Omit
export const uploadOrder = createAsyncThunk(
  'stickers/upload_order',
  async (
    data: {
      cost: number;
      address: string;
      number: number;
      cropping: boolean;
      stickers: Array<IUploadSticker>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.uploadOrder(
        data.cost,
        data.address,
        data.number,
        data.cropping,
        data.stickers
      );
      return { data: response.data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const stickersSlice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    addCard(state, action: { payload: ISticker; type: string }) {
      state.items.push({ ...action.payload });
    },
    setActive(state, action: { payload: string; type: string }) {
      state.items = state.items.map((sticker) => {
        if (sticker.id !== action.payload) {
          sticker.active = false;
        } else sticker.active = true;
        return sticker;
      });
    },
    setValid(state, action: { payload: { id: string; valid: boolean }; type: string }) {
      const { id, valid } = action.payload;
      const indexCard = state.items.find((sticker) => sticker.id === id);

      if (valid === true && indexCard) {
        indexCard.valid = true;
      } else if (valid === false && indexCard) {
        indexCard.valid = false;
      }
    },
    setProcessing(state, action) {
      state.processing = action.payload;
    },
    checkValidation(state) {
      const indexCard = state.items.find((sticker) => sticker.valid === false);

      if (indexCard) {
        state.valid = false;
      } else state.valid = true;
    },
    deleteCard(state, action: { payload: string; type: string }) {
      state.items = state.items.filter((sticker) => sticker.id !== action.payload);
      if (state.items.length === 0) {
        state.items = [
          {
            image: '',
            shape: 'square',
            amount: 1,
            size: { width: 0, height: 0 },
            optimalSize: { width: 0, height: 0 },
            id: `1`,
            active: true,
            valid: false,
          },
        ];
      }
    },
    cleanCards(state) {
      state.items = initialState.items;
      state.valid = initialState.valid;
    },
    updateCard(state, action) {
      const { id, updatedCard } = action.payload;
      const indexCard = state.items.findIndex((sticker) => sticker.id === id);

      if (indexCard !== -1) {
        state.items[indexCard] = updatedCard;
      }
    },
    updateShape(state, action: { payload: { id: string; shape: TCardShape }; type: string }) {
      const { id, shape } = action.payload;
      const indexCard = state.items.find((sticker) => sticker.id === id);

      if (indexCard) {
        indexCard.shape = shape;
      }
    },
    updateAmount(state, action: { payload: { id: string; amount: number }; type: string }) {
      const { id, amount } = action.payload;
      const indexCard = state.items.find((sticker) => sticker.id === id);

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
      }
    ) {
      state.items = state.items.map((sticker) => {
        if (sticker.id === action.payload.id) {
          sticker.image = action.payload.image;
          sticker.size = action.payload.size;
          sticker.optimalSize = action.payload.optimalSize;
        }
        return sticker;
      });
    },
    updateSize(state, action: { payload: { id: string; width: number; height: number }; type: string }) {
      const { id, width, height } = action.payload;
      const foundCard = state.items.find((sticker) => sticker.id === id);

      if (foundCard) {
        foundCard.size.width = width;
        foundCard.size.height = height;
      }
    },

    setCardsFromCart(state, action) {
      const newCards = action.payload.map((card: IServerSticker, index: number) => {
        const newCard: ISticker = {
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
      state.items = newCards;
    },
  },
});

export const reducerStickres = stickersSlice.reducer;
