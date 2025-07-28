import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type productType = {
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
};

interface ProductsState {
  products: { [page: number]: productType[] };
  pagination: number;
}

export const BASE_PRODUCTS_API = "https://fakestoreapi.in/api/products";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (page: number) => {
//     try {
//       const response = await fetch(
//         `${BASE_PRODUCTS_API}?page=${page}&limit=10`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       console.log(data);
//       return data.products;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }
// );

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: 1,
  } as ProductsState,
  reducers: {
    nextPage: (state) => {
      state.pagination += 1;
    },
    setProducts: (state, action) => {
      if (action.payload) {
        state.products[state.pagination] = action.payload;
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       if (action.payload) {
  //         state.products[state.pagination] = action.payload;
  //       }
  //       state.isLoading = false;
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       console.error("Failed to fetch products:", action.error.message);
  //       state.isLoading = false;
  //       state.error = action.error.message || "Failed to fetch products";
  //     });
  // },
});

export const { nextPage, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
