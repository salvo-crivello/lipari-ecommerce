import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_PRODUCTS_API, productType } from "./sliceProducts";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const ProductsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PRODUCTS_API,
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<productType[], number>({
      query: (page: number) => `?page=${page}&limit=4`,
      transformResponse: (response: { products: productType[] }) =>
        response.products,
    }),
    fetchProductById: builder.query<productType, number>({
      query: (id) => `/${id}`,
    }),
    getLimitedProducts: builder.query<productType[], number>({
      query: (limit: number) => `?limit=${limit}`,
    }),
    getAllCategories: builder.query<string[], void>({
      query: () => "/category",
    }),
    getProductsByCategory: builder.query<productType[], string>({
      query: (category) => `/category?type=${category}`,
      transformResponse: (response: { products: productType[] }) =>
        response.products,
    }),
    addProduct: builder.mutation<productType, Partial<productType>>({
      query: (newProduct) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newProduct,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductByIdQuery,
  useGetProductsByCategoryQuery,
  useAddProductMutation,
} = ProductsApiSlice;

export default ProductsApiSlice;
