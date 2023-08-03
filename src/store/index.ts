import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { popupSliceReducer } from './popupSlice';
import { userSliceReducer } from './userSlice';
import { authSliceReducer } from './authSlice';
import { cardsSliceReducer } from './cardsSlice';
import { cartSliceReducer } from './cartSlice';

const rootReducer = combineReducers({
  popup: popupSliceReducer,
  user: userSliceReducer,
  auth: authSliceReducer,
  cards: cardsSliceReducer,
  cart: cartSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  /* #TODO: Разобраться serializableCheck с включенным падают ошибки!*/
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const AppDispatch = store.dispatch;

export { store, AppDispatch };
