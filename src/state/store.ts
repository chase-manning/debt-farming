import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
