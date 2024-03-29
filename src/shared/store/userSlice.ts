import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@api/UserApi';
import { IUserState, IOrder } from '@shared/interfaces';
import { API_URL } from '@utils/constants';

const initialState: IUserState = {
  email: '',
  firstName: '',
  lastName: '',
  avatar: `${API_URL}/user/profile-image`,
  orders: [],
  ordersAlert: 0,
  ordersLoading: false,
  ordersError: false,
  isLogged: false,
  isVerified: false,
};

const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    return userApi.getUser();
  } catch (err) {
    return err;
  }
});

const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { email: string; firstName: string; lastName: string }, { rejectWithValue }) => {
    try {
      return userApi.updateUser(data.email, data.firstName, data.lastName);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateProfileImage = createAsyncThunk('user/updateProfileImage', async (data: FormData, { rejectWithValue }) => {
  try {
    return userApi.uploadProfileImage(data);
  } catch (err) {
    return rejectWithValue(err);
  }
});

const deleteProfileImage = createAsyncThunk('user/deleteProfileImage', async () => {
  try {
    return userApi.deleteProfileImage();
  } catch (err) {
    return err;
  }
});

const getUserOrders = createAsyncThunk('user/getUserOrders', async (data, { rejectWithValue }) => {
  try {
    return userApi.getUserOrders();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInMockUser(state, action) {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isLogged = true;
    },

    updateStatus(state, action) {
      state.isLogged = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение юзера, если есть token
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.isVerified = action.payload.is_verified;
      state.isLogged = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.email = '';
      state.isLogged = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.isVerified = action.payload.is_verified;
      state.isLogged = true;
    });

    builder.addCase(getUserOrders.fulfilled, (state, action: { payload: Array<IOrder>; type: string }) => {
      state.ordersLoading = false;
      state.ordersError = false;
      state.orders = action.payload;
      state.ordersAlert = action.payload.reduce((acc, item) => acc + (item.status === 'ready for pickup' ? 1 : 0), 0);
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.ordersLoading = true;
      state.ordersError = false;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.orders = [];
      state.ordersLoading = false;
      state.ordersError = true;
    });
  },
});

const userSliceReducer = userSlice.reducer;
const { signInMockUser, updateStatus } = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  signInMockUser,
  updateStatus,
  updateProfileImage,
  deleteProfileImage,
  getUserOrders,
};
