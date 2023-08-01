import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { popupSliceReducer } from './popupSlice';
import { userSliceReducer } from './userSlice';
import { authSliceReducer } from './authSlice';
import { cardsSliceReducer } from './cardsSlice';

const rootReducer = combineReducers({
  popup: popupSliceReducer,
  user: userSliceReducer,
  auth: authSliceReducer,
  cards: cardsSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  /* #TODO: Разобраться serializableCheck с включенным падают ошибки!*/
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const AppDispatch = store.dispatch;

export { store, persistor, AppDispatch };
