import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Popups/Signin/Signin';
import { ChangePassword } from '../components/Popups/ChangePassword/ChangePassword';

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    isOpen: false,
    form: Signin,
    previewIsOpen: false,
    formIsOpen: false,
    infoIsOpen: false,
    infoTitle: '',
    infoText: '',
    infoButtonText: '',
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
    setFormIsOpen(state, action) {
      if (!state.isOpen) {
        state.form = Signin;
      }
      if (action.payload === ChangePassword) {
        state.form = ChangePassword;
      }
      state.isOpen = action.payload;
      state.formIsOpen = action.payload;
    },
    setInfoIsOpen(
      state,
      action: { payload: { infoIsOpen: boolean; title: string; text: string; buttonText: string } },
    ) {
      state.isOpen = action.payload.infoIsOpen;
      state.infoIsOpen = action.payload.infoIsOpen;
      state.infoTitle = action.payload.title;
      state.infoText = action.payload.text;
      state.infoButtonText = action.payload.buttonText;
    },
    switchForm(state, action) {
      state.form = action.payload;
    },
  },
});

const popupSliceReducer = popupSlice.reducer;
const { setMessageIsOpen, setFormIsOpen, setInfoIsOpen, switchForm, setPreviewIsOpen } =
  popupSlice.actions;

export {
  popupSliceReducer,
  setMessageIsOpen,
  setFormIsOpen,
  setInfoIsOpen,
  switchForm,
  setPreviewIsOpen,
};
