import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Signin/Signin';

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    isOpen: false,
    form: Signin,
    previewIsOpen: false,
    messageIsOpen: false,
    message: '',
    messageIsError: false,
  },
  reducers: {
    setMessageIsOpen(state, action) {
      state.messageIsOpen = action.payload.messageIsOpen;
      state.message = action.payload.message;
      state.messageIsError = action.payload.messageIsError;
    },
    setPreviewIsOpen(state, action) {
      state.isOpen = action.payload;
      state.previewIsOpen = action.payload;
    },
    setIsOpen(state, action) {
      if (!state.isOpen) {
        state.form = Signin;
      }
      state.isOpen = action.payload;
    },
    switchForm(state, action) {
      state.form = action.payload;
    },
  },
});

const popupSliceReducer = popupSlice.reducer;
const { setMessageIsOpen, setIsOpen, switchForm, setPreviewIsOpen } = popupSlice.actions;

export { popupSliceReducer, setMessageIsOpen, setIsOpen, switchForm, setPreviewIsOpen };
