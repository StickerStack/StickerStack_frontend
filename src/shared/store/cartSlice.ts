import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pagePrice } from '../../utils/constants';
import { cartApi } from '../../api/CartApi';
import { ISticker, IStickerForOrder } from '../interfaces/ISticker';
import { ICart } from '../interfaces/ICart';

const initialState: ICart = {
  cost: pagePrice,
  totalAmount: 1,
  address: 'Москва, ул. Пушкина, дом Калатушкина 25',
  number_of_sheets: 1,
  cropping: false,
};

export const uploadOrder = createAsyncThunk(
  'add_order',
  async (
    data: {
      cost: number;
      address: string;
      number: number;
      cropping: boolean;
      stickers: Array<IStickerForOrder>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await cartApi.uploadOrder(data.cost, data.address, data.number, data.cropping, data.stickers);
      return { data: response.data };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    updateCropping(state, action: { payload: boolean; type: string }) {
      state.cropping = action.payload;
    },
    updateAddress(state, action: { payload: string; type: string }) {
      state.address = action.payload;
    },
    updateSheets(state, action: { payload: number; type: string }) {
      state.number_of_sheets = action.payload;
    },
    countTotal(state, action: { payload: Array<ISticker>; type: string }) {
      const sumAmount = action.payload.reduce((acc, item) => acc + item.amount, 0);
      const sumCost = state.number_of_sheets * pagePrice;

      state.totalAmount = sumAmount;
      state.cost = sumCost;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadOrder.fulfilled, (state, action) => {
      console.log(action.payload.data);
    });
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const { updateCropping, updateAddress, updateSheets, countTotal } = cartSlice.actions;
