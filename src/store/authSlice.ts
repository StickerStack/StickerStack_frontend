import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(data.email, data.password);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(data.email, data.password);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: { email: string }) => {
    const response = await api.forgotPassword(data.email);
    return response.data;
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { token: string; password: string }) => {
    const response = await api.resetPassword(data.token, data.password);
    return response.data;
  }
);

const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: { token: string }, { rejectWithValue }) => {
    try {
      const response = await api.verifyEmail(data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const sendVerificationCode = createAsyncThunk(
  'auth/sendVerificationCode',
  async (data, {rejectWithValue}) => {
    try {
      const response = await api.sendVerifycationCode();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const logOut = createAsyncThunk(
  'auth/logOut',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.logOut();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Регистрация пользователя
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });

    // Вход пользователя
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });

    // Воставновление пароля, по email
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Сохранение нового пароля, по токену
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Верификация Email по токен
    builder.addCase(verifyEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Удаления токена - выход из профиля
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(logOut.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

const authSliceReducer = authSlice.reducer;

export {
  authSliceReducer,
  signIn,
  signUp,
  resetPassword,
  forgotPassword,
  verifyEmail,
  logOut,
  sendVerificationCode
};
