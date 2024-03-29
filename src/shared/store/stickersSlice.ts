import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStickersState, ISticker } from '@shared/interfaces';
import { cartApi } from '@api/CartApi';
import { calculateStickerOnList } from '@utils/calculateStickerOnList';
import { CARDS_MAXIMUM, pageSizePx } from '@utils/constants';

export const getStickers = createAsyncThunk('sticker/getStickers', async (_, { rejectWithValue }) => {
  try {
    return await cartApi.getCart();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const clearStickers = createAsyncThunk('clear_cart', async (data, { rejectWithValue }) => {
  try {
    return await cartApi.clearCart();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const putStickerInCart = createAsyncThunk(
  'sticker/putStickerInCart',
  async (sticker: ISticker, { rejectWithValue }) => {
    try {
      return await cartApi.putStickerInCart(sticker);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const addStickers = createAsyncThunk(
  'sticker/addStickers',
  async (stickers: Array<ISticker>, { rejectWithValue }) => {
    try {
      return await cartApi.addStickers(stickers);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteSticker = createAsyncThunk('sticker/deleteSticker', async (id: string, { rejectWithValue }) => {
  try {
    await cartApi.deleteSticker(id);
    return id;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// Добавить pages массив для посчитаных стикеров
const initialState: IStickersState = {
  loading: false,
  error: false,
  stickers: [
    {
      id: 'newSticker',
      image: '',
      shape: 'square',
      amount: 1,
      width: 3,
      height: 3,
      optimal_width: 3,
      optimal_height: 3,
      size_type: 'optimal',
    },
  ],
  pages: [],
};

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    updateSticker(state, action) {
      state.stickers = state.stickers.map((sticker) => {
        if (sticker.id === action.payload.id) {
          sticker = action.payload;
        }
        return sticker;
      });
    },
    removeAllStickers(state) {
      state.stickers = [
        {
          id: 'newSticker',
          image: '',
          shape: 'square',
          amount: 1,
          width: 3,
          height: 3,
          optimal_width: 3,
          optimal_height: 3,
          size_type: 'optimal',
        },
      ];
    },
    addEmptySticker(state) {
      if (state.stickers.length < CARDS_MAXIMUM) {
        state.stickers.push({
          id: 'newSticker',
          image: '',
          shape: 'square',
          amount: 1,
          width: 3,
          height: 3,
          optimal_width: 3,
          optimal_height: 3,
          size_type: 'optimal',
        });
      }
    },
    addSticker(state, action) {
      state.stickers = state.stickers.map((sticker) => {
        if (sticker.id === 'newSticker') {
          sticker = action.payload;
        }
        return sticker;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStickers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;

      if (action.payload.length < CARDS_MAXIMUM) {
        state.stickers = [
          ...action.payload,

          {
            id: 'newSticker',
            image: '',
            shape: 'square',
            amount: 1,
            width: 3,
            height: 3,
            optimal_width: 3,
            optimal_height: 3,
            size_type: 'optimal',
          },
        ];
      } else {
        state.stickers = [...action.payload];
      }

      state.pages = calculateStickerOnList(state.stickers.slice(0, state.stickers.length - 1), pageSizePx);
    });
    builder.addCase(getStickers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getStickers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(putStickerInCart.fulfilled, (state, action) => {
      state.stickers = state.stickers.map((sticker) => {
        if (sticker.id === action.payload.id) {
          sticker = action.payload;
        }
        return sticker;
      });

      state.pages = calculateStickerOnList(state.stickers.slice(0, state.stickers.length - 1), pageSizePx);
    });
    builder.addCase(clearStickers.fulfilled, (state) => {
      state.stickers = [];
    });
    builder.addCase(deleteSticker.fulfilled, (state, action) => {
      state.stickers = state.stickers.filter((sticker) => sticker.id !== action.payload);
      if (
        state.stickers.length === CARDS_MAXIMUM - 1 &&
        !state.stickers.find((sticker) => sticker.id === 'newSticker')
      ) {
        state.stickers.push({
          id: 'newSticker',
          image: '',
          shape: 'square',
          amount: 1,
          width: 3,
          height: 3,
          optimal_width: 3,
          optimal_height: 3,
          size_type: 'optimal',
        });
      }

      state.pages = calculateStickerOnList(state.stickers.slice(0, state.stickers.length - 1), pageSizePx);
    });
  },
});

export const stickerSliceReducer = stickerSlice.reducer;
export const { updateSticker, addEmptySticker, addSticker, removeAllStickers } = stickerSlice.actions;
