import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./sliceProducts";

const store = configureStore({
  reducer: {
    productsData: productsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
