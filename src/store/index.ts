import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { formSliceReducer } from "./formSlice";

const rootReducer = combineReducers({
  forms: formSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  /* #TODO: Разобраться serializableCheck с включенным падают ошибки!*/
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export { store };
