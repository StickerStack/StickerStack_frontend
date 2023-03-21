import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Signin/Signin';

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    isOpen: false,
    form: Signin,
    messageIsOpen: false,
    message: '',
  },
  reducers: {
    setMessageIsOpen(state, action) {
      state.messageIsOpen = action.payload.messageIsOpen;
      state.message = action.payload.message;
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
      state.form = Signin;
    },
    switchForm(state, action) {
      state.form = action.payload;
    },
  },
});

const popupSliceReducer = popupSlice.reducer;
const { setMessageIsOpen, setIsOpen, switchForm } = popupSlice.actions;

export { popupSliceReducer, setMessageIsOpen, setIsOpen, switchForm };
