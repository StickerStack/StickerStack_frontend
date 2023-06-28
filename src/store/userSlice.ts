import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import { userApi } from '../utils/api/UserApi';
import { authApi } from '../utils/api/AuthApi';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  isLogged: false,
  isVerified: false
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
  async (data: { email: string; firstName: string; lastName: string }, {rejectWithValue}) => {
    try {
      return userApi.updateUser(data.email, data.firstName, data.lastName);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (data : { formData: FormData }, { rejectWithValue }) => {
    try {
      return authApi.uploadProfileImage(data.formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getProfileImage = createAsyncThunk(
  'user/getProfileImage',
  async (data, { rejectWithValue }) => {
    try {
      return authApi.getProfileImage();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
    }
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
  },
});

const userSliceReducer = userSlice.reducer;
const {signInMockUser, updateStatus} = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  signInMockUser,
  updateStatus,
  updateProfileImage,
  getProfileImage
};
