import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../components/Signin/Signin';
import { ImageForm } from '../components/ImageForm/ImageForm';

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    isOpen: false,
    cropMode: false,
    newCrop: '',
    imageSrc: '',
    form: Signin,
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
    setIsOpen(state, action) {
      if (!state.isOpen) {
        state.form = Signin;
      }
      state.isOpen = action.payload;
    },
    setCropIsOpen(state, action) {
      state.imageSrc = action.payload.imageSrc;
      state.form = ImageForm;
      state.cropMode = action.payload;
      state.isOpen = action.payload.imageIsOpen;
    },
    setNewCrop(state, action) {
      state.newCrop = action.payload;
    },
    switchForm(state, action) {
      state.form = action.payload;
    },
  },
});

const popupSliceReducer = popupSlice.reducer;
const { setMessageIsOpen, setCropIsOpen, setIsOpen, setNewCrop, switchForm } = popupSlice.actions;

export { popupSliceReducer, setMessageIsOpen, setCropIsOpen, setNewCrop, setIsOpen, switchForm };
