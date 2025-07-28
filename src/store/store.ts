import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./sliceProducts";
import productsApiSlice from "./productsApiSlice";

const store = configureStore({
  reducer: {
    productsData: productsSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
