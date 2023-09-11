import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStickersState } from "../interfaces/IStickersState";
import { cartApi } from "../utils/api/CartApi";
import { ISticker } from "../interfaces/ISticker-new";

export const getStickers = createAsyncThunk(
  "sticker/getStickers",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.getCart();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const putStickerInCart = createAsyncThunk(
  "sticker/putStickerInCart",
  async (sticker: ISticker, { rejectWithValue }) => {
    try {
      return await cartApi.putStickerInCart(sticker);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const initialState: IStickersState = {
  stickers: [{
    id: 0,
    image: '',
    shape: 'square',
    amount: 0,
    width: 0,
    height: 0,
    optimal_width: 0,
    optimal_height: 0
  }],
}

const stickerSlice = createSlice({
  name: "sticker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStickers.fulfilled, (state, action) => {
      state.stickers = action.payload;
    });
    builder.addCase(putStickerInCart.fulfilled, (state, action) => {
      state.stickers = state.stickers.map((sticker) => {
        if (sticker.id === action.payload.id) {
          sticker = action.payload;
        }
        return sticker;
      });
    });
  }
});

export const stickerSliceReducer = stickerSlice.reducer;
