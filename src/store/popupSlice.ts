import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Signin/Signin';

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    isOpen: false,
    form: Signin,
  },
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
      state.form = Signin;
    },
    switchForm(state, action) {
      state.form = action.payload;
    },
  }
});

const popupSliceReducer = popupSlice.reducer;
const { setIsOpen, switchForm } = popupSlice.actions;

export { popupSliceReducer, setIsOpen, switchForm }