import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { formSliceReducer } from "./formSlice";

const rootReducer = combineReducers({
  forms: formSliceReducer
});

const store = configureStore({
  reducer: rootReducer
});

export { store };
