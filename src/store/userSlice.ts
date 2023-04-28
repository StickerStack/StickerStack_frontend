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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    loading: false,
    success: false,
    isLogged: false
  },
  reducers: {
    signInMockUser(state, action) {
      state.email = action.payload;
      state.isLogged = true;
      state.loading = false;
      state.success = true;
    },

    updateStatus(state, action) {
      state.isLogged = action.payload;
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
  },
});

const userSliceReducer = userSlice.reducer;
const { signInMockUser, updateStatus } = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  signInMockUser,
  updateStatus
};
