import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderItem } from '../interfaces/OrderItem';
import { pagePrice } from '../utils/constants';
import { cartApi } from '../utils/api/CartApi';
import { ISticker } from '../interfaces/ISticker-new';
import { ICart } from '../interfaces/ICart';

const initialState: ICart = {
  cost: 0,
  totalAmount: 0,
  address: '',
  number_of_sheets: 1,
  cropping: false,
  items: [],
};

const addSticker = createAsyncThunk(
  'cart/add_sticker',
  async (data: ISticker, { rejectWithValue }) => {
    try {
      const response = await cartApi.addSticker(data);
      return { data: response.data };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const getCart = createAsyncThunk('get_cart', async (data, { rejectWithValue }) => {
  try {
    return await cartApi.getCart();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const deleteSticker = createAsyncThunk(
  'cart/delete_sticker',
  async (data: string, { rejectWithValue }) => {
    try {
      await cartApi.deleteSticker(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const uploadOrder = createAsyncThunk(
  'add_order',
  async (
    data: {
      cost: number;
      address: string;
      number: number;
      cropping: boolean;
      stickers: Array<OrderItem>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await cartApi.uploadOrder(
        data.cost,
        data.address,
        data.number,
        data.cropping,
        data.stickers,
      );
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
    addItems(state, action: { payload: Array<ISticker>; type: string }) {
      state.items.push(...action.payload);
    },
    addItem(state, action: { payload: ISticker; type: string }) {
      const indexCard = state.items.find((card) => card.id === action.payload.id);
      if (!indexCard) {
        state.items.push({ ...action.payload });
      }
    },
    deleteItem(state, action: { payload: string; type: string }) {
      state.items = state.items.filter((card) => card.id !== action.payload);
    },
    cleanCart(state) {
      state.items = [];
    },
    updateItem(state, action: { payload: ISticker; type: string }) {
      const { id, shape, amount, width, height, image } = action.payload;
      const indexCard = state.items.find((card) => card.id === id);
      if (indexCard) {
        indexCard.shape = shape;
        indexCard.amount = amount;
        indexCard.width = width;
        indexCard.height = height;
        indexCard.image = image;
      }
    },
    updateCropping(state, action: { payload: boolean; type: string }) {
      state.cropping = action.payload;
    },
    updateAddress(state, action: { payload: string; type: string }) {
      state.address = action.payload;
    },
    updateSheets(state, action: { payload: number; type: string }) {
      state.number_of_sheets = action.payload;
    },
    countTotal(state) {
      const sumAmount = state.items.reduce((acc, item) => acc + item.amount, 0);
      const sumCost = state.number_of_sheets * pagePrice;

      state.totalAmount = sumAmount;
      state.cost = sumCost;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadOrder.fulfilled, (state, action) => {
      console.log(action.payload.data);
    });
    builder.addCase(getCart.fulfilled, (state, action: { payload: Array<ISticker> }) => {
      state.items = action.payload;
    });
  },
});

const cartSliceReducer = cartSlice.reducer;
const {
  addItem,
  addItems,
  deleteItem,
  cleanCart,
  updateItem,
  updateCropping,
  updateAddress,
  updateSheets,
  countTotal,
} = cartSlice.actions;

export {
  cartSliceReducer,
  getCart,
  addSticker,
  deleteSticker,
  addItems,
  addItem,
  deleteItem,
  cleanCart,
  updateItem,
  updateCropping,
  updateAddress,
  uploadOrder,
  updateSheets,
  countTotal,
};
