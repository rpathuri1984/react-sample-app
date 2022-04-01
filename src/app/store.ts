import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import { setupListeners } from "@reduxjs/toolkit/query";
import { catalogAPI } from "./../features/catalog/catalogAPI";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [catalogAPI.reducerPath]: catalogAPI.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(catalogAPI.middleware),
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;
