import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './sliceProducts';
import filteredProductsSlice from './sliceFilteredProducts';
import productsApiSlice from './productsApiSlice';
import cartSlice from './sliceCart';
import whishListSlice from './sliceWishList';

const store = configureStore({
	reducer: {
		productsData: productsSlice,
		filteredProductsData: filteredProductsSlice,
		cartData: cartSlice,
		wishListData: whishListSlice,
		[productsApiSlice.reducerPath]: productsApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
