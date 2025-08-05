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

interface ProductsFilteredState {
	products: productType[];
}

export const BASE_PRODUCTS_API = 'https://fakestoreapi.in/api/products';

const productsSlice = createSlice({
	name: 'filteredProducts',
	initialState: {
		products: [],
	} as ProductsFilteredState,
	reducers: {
		setFilteredProducts: (state, action) => {
			if (action.payload) {
				state.products = action.payload;
				console.log(`Filtered products set:`, action.payload);
			}
		},
		clearFilteredProducts: (state) => {
			state.products = [];
			console.log('Filtered products cleared');
		},
	},
});

export const { clearFilteredProducts, setFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;
