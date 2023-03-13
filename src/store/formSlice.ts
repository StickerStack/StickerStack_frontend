import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Signin/Signin';

const formSlice = createSlice({
  name: 'formSlice',
  initialState: {
    form: Signin,
  },
  reducers: {
    switchForm(state, action) {
      state.form = action.payload;
    },
  },
});

const formSliceReducer = formSlice.reducer;
const { switchForm } = formSlice.actions;

export { formSliceReducer, switchForm };
