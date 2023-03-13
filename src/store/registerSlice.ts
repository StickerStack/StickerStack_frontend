import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const signUp = createAsyncThunk(
  'register/signUp',
  async (data: { email: string; password: string }) => {
    const response = await api.signUp(data.email, data.password);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    email: '',
    password: '',
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
  },
});

const registerSliceReducer = registerSlice.reducer;

export { registerSliceReducer, signUp };
