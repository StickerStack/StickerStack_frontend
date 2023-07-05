import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Popups/Signin/Signin';
import { IPopupState } from '../interfaces';

const initialState: IPopupState = {
  isOpen: false,
  form: {
    isOpen: false,
    element: Signin,
  },
  preview: {
    isOpen: false,
  },
  info: {
    isOpen: false,
    title: '',
    text: '',
    buttonText: '',
  },
  message: {
    isOpen: false,
    isError: false,
    text: '',
  }
};

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState,
  reducers: {
    openPopup(state, action: { payload: React.FC; type: string }) {
      state.isOpen = true;
      state.form.isOpen = true;
      state.form.element = action.payload;
    },

    openPreview(state) {
      state.isOpen = true;
      state.preview.isOpen = true;
    },

    openInfo(state, action: { payload: { title: string; text: string; buttonText: string }; type: string }) {
      state.isOpen = true;
      state.info.isOpen = true;
      state.info.text = action.payload.text;
      state.info.buttonText = action.payload.buttonText;
      state.info.title = action.payload.title;
    },

    closePopup(state) {
      state.form.isOpen = false;

      state.info.isOpen = false;
      state.info.title = '';
      state.info.text = '';
      state.info.buttonText = '';

      if (localStorage.getItem('change-password-token')) {
        localStorage.removeItem('change-password-token');
      }
      if (localStorage.getItem('email')) {
        localStorage.removeItem('email');
      }

      state.isOpen = false;
    },

    openMessage(state, action: { payload: { text: string, isError: boolean }, type: string }) {
      state.message.isOpen = true;
      state.message.isError = action.payload.isError;
      state.message.text = action.payload.text;
    },

    closeMessage(state) {
      state.message.isOpen = false;
      state.message.isError = false;
      state.message.text = '';
    }
  },
});

const popupSliceReducer = popupSlice.reducer;
const { closePopup, openPopup, openPreview, openInfo, openMessage, closeMessage } = popupSlice.actions;

export { popupSliceReducer, closePopup, openPopup, openPreview, openInfo, openMessage, closeMessage };
