import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType } from './sliceProducts';

type WishListState = {
	items: productType[];
	isLoading: boolean;
};

const wishListSlice = createSlice({
	name: 'wishlist',
	initialState: {
		items: [],
		isLoading: false,
	} as WishListState,
	reducers: {
		addToWishList: (state, action: PayloadAction<productType>) => {
			state.isLoading = true;
			const exists = state.items.find((i) => i.id === action.payload.id);
			if (exists) {
				console.log(`Product ${action.payload.id} already in wishlist`);
				return;
			} else {
				console.log(`Product ${action.payload.id} added to wishlist`);
				state.items.push(action.payload);
			}
			state.isLoading = false;
		},
		removeFromWishList: (state, action: PayloadAction<number>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item) {
				state.items = state.items.filter((i) => i.id !== action.payload);
			}
		},
		clearWishList: (state) => {
			state.items = [];
		},
		loadWishListFromLocalStorage: (state, action: PayloadAction<productType[]>) => {
			state.items = action.payload;
		},
	},
});

export const { addToWishList, removeFromWishList, clearWishList, loadWishListFromLocalStorage } = wishListSlice.actions;

export default wishListSlice.reducer;
