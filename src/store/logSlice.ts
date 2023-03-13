import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const signIn = createAsyncThunk(
  'log/signIn',
  async (data: { email: string; password: string }) => {
    const response = await api.signIn(data.email, data.password);
    return response.data;
  }
);

const logOut = createAsyncThunk('log/logOut', async () => {
  const response = await api.logOut();
  return response.data;
});

const authSlice = createSlice({
  name: 'log',
  initialState: {
    email: '',
    password: '',
    token: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

const logSliceReducer = authSlice.reducer;

export { logSliceReducer, signIn, logOut };
