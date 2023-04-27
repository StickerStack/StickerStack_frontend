import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await api.getUser();
  return response;
});

const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { email: string; password: string }) => {
    const response = await api.updateUser(data.email, data.password);
    return response.data;
  }
);

const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await api.logOut();
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    loading: false,
    success: false,
    isLogged: false
  },
  reducers: {
    singInMockUser(state, action) {
      state.email = action.payload;
      state.isLogged = true;
      state.loading = false;
      state.success = true;
    }
  },
  extraReducers: (builder) => {
    // Получение юзера, если есть token
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.email = action.payload.email;
      state.isLogged = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.email = '';
      state.isLogged = false;
    });

    // Выход пользователя, если есть token
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.email = '';
      state.isLogged = false;
    });
    builder.addCase(logOut.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

const userSliceReducer = userSlice.reducer;
const { singInMockUser } = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  logOut,
  singInMockUser
};
