import { createSlice } from '@reduxjs/toolkit';

import { Signin } from '../../components/Popups';
import { IPopupState, IOrder } from '@shared/interfaces';

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
    buttonSecondText: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClickSecond: () => {},
    src: '',
    imageAbsolute: false,
  },
  message: {
    isOpen: false,
    isError: false,
    text: '',
  },
  order: {
    isOpen: false,
    content: {
      order_number: 0,
      address: '',
      cropping: true,
      created_at: '',
      status: '',
      cost: 0,
      number_of_sheets: 0,
      stickers: [],
    },
  },
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

    openInfo(
      state,
      action: {
        payload: {
          title: string;
          text: string;
          buttonText: string;
          buttonSecondText?: string;
          onClick?: () => void;
          onClickSecond?: () => void;
          image: string;
          imageAbsolute?: boolean;
        };
        type: string;
      },
    ) {
      state.isOpen = true;
      state.info.isOpen = true;
      state.info.text = action.payload.text;
      state.info.buttonText = action.payload.buttonText;
      state.info.buttonSecondText = action.payload.buttonSecondText;
      state.info.title = action.payload.title;
      state.info.onClick = action.payload.onClick;
      state.info.onClickSecond = action.payload.onClickSecond;
      state.info.src = action.payload.image;
      state.info.imageAbsolute = action.payload.imageAbsolute;
    },

    openOrder(state, action: { payload: IOrder; type: string }) {
      state.isOpen = true;
      state.order.isOpen = true;
      state.order.content = action.payload;
    },

    closePopup(state) {
      state.form.isOpen = false;
      state.order.isOpen = false;
      state.info.isOpen = false;
      state.preview.isOpen = false;
      state.isOpen = false;
      state.info.title = '';
      state.info.text = '';
      state.info.buttonText = '';
    },

    openMessage(state, action: { payload: { text: string; isError: boolean }; type: string }) {
      state.message.isOpen = true;
      state.message.isError = action.payload.isError;
      state.message.text = action.payload.text;
    },

    closeMessage(state) {
      state.message.isOpen = false;
      state.message.isError = false;
      state.message.text = '';
    },
  },
});

const popupSliceReducer = popupSlice.reducer;
const { closePopup, openPopup, openPreview, openOrder, openInfo, openMessage, closeMessage } = popupSlice.actions;

export { popupSliceReducer, closePopup, openPopup, openOrder, openPreview, openInfo, openMessage, closeMessage };
