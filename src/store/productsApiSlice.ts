import { createApi } from '@reduxjs/toolkit/query/react';
import { productType } from './sliceProducts';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const BASE_PRODUCTS_API = 'https://fakestoreapi.in/api/products';

// type FetchProductsQueryArgs = {
// 	category?: string;
// 	page?: number;
// 	limit?: number;
// 	brand?: string;
// 	priceMin?: number;
// 	priceMax?: number;
// };

const ProductsApiSlice = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_PRODUCTS_API,
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<productType[], void>({
			query: () => `/`,
		}),
		fetchProducts: builder.query<productType[], number>({
			query: (page: number) => `?page=${page}&limit=12`,
			transformResponse: (response: { products: productType[] }) => response.products,
		}),
		fetchProductById: builder.query<productType, number>({
			query: (id) => `/${id}`,
		}),
		getLimitedProducts: builder.query<productType[], number>({
			query: (limit: number) => `?limit=${limit}`,
		}),
		getAllCategories: builder.query<string[], void>({
			query: () => '/category',
		}),
		getProductsByCategory: builder.query<productType[], string>({
			query: (category) => `/category?type=${category}`,
			transformResponse: (response: { products: productType[] }) => response.products,
		}),
		addProduct: builder.mutation<productType, Partial<productType>>({
			query: (newProduct) => ({
				url: '/',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: newProduct,
			}),
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useFetchProductsQuery,
	useFetchProductByIdQuery,
	useGetProductsByCategoryQuery,
	useAddProductMutation,
} = ProductsApiSlice;

export default ProductsApiSlice;
