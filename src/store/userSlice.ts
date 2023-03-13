import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await api.getUser();
  return response.data;
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
    password: '',
    loading: false,
    success: false,
  },
  reducers: {},
});

const userSliceReducer = userSlice.reducer;

export { userSliceReducer, getUser, updateUser };
