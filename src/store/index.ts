import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formSliceReducer } from './formSlice';
import { registerSliceReducer } from './registerSlice';
import { logSliceReducer } from './logSlice';
import { userSliceReducer } from './userSlice';

const rootReducer = combineReducers({
  forms: formSliceReducer,
  register: registerSliceReducer,
  log: logSliceReducer,
  user: userSliceReducer,
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
