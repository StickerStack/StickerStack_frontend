import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/AuthApi';

const initialState = {};

const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return authApi.signUp(data.email, data.password);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return authApi.signIn(data.email, data.password);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const forgotPassword = createAsyncThunk('auth/forgotPassword', async (data: { email: string }) => {
  try {
    return authApi.forgotPassword(data.email);
  } catch (err) {
    return err;
  }
});

const resetPassword = createAsyncThunk('auth/resetPassword', async (data: { token: string; password: string }) => {
  try {
    return authApi.resetPassword(data.token, data.password);
  } catch (err) {
    return err;
  }
});

const verifyEmail = createAsyncThunk('auth/verifyEmail', async (data: { token: string }, { rejectWithValue }) => {
  try {
    return authApi.verifyEmail(data.token);
  } catch (err) {
    return rejectWithValue(err);
  }
});

const sendVerificationCode = createAsyncThunk('auth/sendVerificationCode', async (data, { rejectWithValue }) => {
  try {
    return authApi.sendVerifycationCode();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const logOut = createAsyncThunk('auth/logOut', async (data, { rejectWithValue }) => {
  try {
    return authApi.logOut();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

const authSliceReducer = authSlice.reducer;

export { authSliceReducer, signIn, signUp, resetPassword, forgotPassword, verifyEmail, logOut, sendVerificationCode };
