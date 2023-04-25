import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const signUp = createAsyncThunk(
  'user/signUp',
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
  'user/signIn',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(data.email, data.password);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await api.logOut();
  return response;
});

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

const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    const response = await api.forgotPassword(data.email);
    return response.data;
  }
);

const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { token: string; password: string }) => {
    const response = await api.resetPassword(data.token, data.password);
    return response.data;
  }
);

const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async (data: { token: string }, { rejectWithValue }) => {
    try {
      const response = await api.verifyEmail(data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isLogged: false,
    loading: false,
    success: false,
  },
  reducers: {
    singInMockUser(state, action) {
      state.isLogged = true;
      state.email = action.payload;
      state.loading = false;
      state.success = true;
    }
  },
  extraReducers: (builder) => {
    // Регистрация пользователя
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });

    // Вход пользователя
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.isLogged = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });

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
  },
});

const userSliceReducer = userSlice.reducer;
const { singInMockUser } = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  logOut,
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  verifyEmail,
  singInMockUser
};
