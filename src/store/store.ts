import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./sliceProducts";
import productsApiSlice from "./productsApiSlice";
import cartSlice from "./sliceCart";

const store = configureStore({
  reducer: {
    productsData: productsSlice,
    cartData: cartSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
