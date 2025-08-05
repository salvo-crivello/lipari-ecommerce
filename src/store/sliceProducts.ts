import { createSlice } from '@reduxjs/toolkit';

export interface productType {
	id: number;
	title: string;
	image: string;
	price: number;
	description: string;
	brand: string;
	model: string;
	color: string;
	category: string;
	discount: number;
	popular?: boolean;
}

interface ProductsState {
	products: { [page: number]: productType[] };
	pagination: number;
}

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: {},
		pagination: 1,
	} as ProductsState,
	reducers: {
		nextPage: (state) => {
			state.pagination += 1;
		},
		setProducts: (state, action) => {
			if (action.payload) {
				state.products[state.pagination] = action.payload;
				console.log(`Products for page ${state.pagination} set:`, action.payload);
			}
		},
		setPage: (state, action) => {
			state.pagination = action.payload;
			console.log(`Page set to ${state.pagination}`);
		},
	},
});

export const { nextPage, setProducts, setPage } = productsSlice.actions;
export default productsSlice.reducer;
