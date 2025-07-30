import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "./sliceProducts";

export interface CartItem extends productType {
  quantity: number;
  finalPrice: number;
}

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  totalCost: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isOpen: false,
    totalCost: 0,
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        exists.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalCost = state.items.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
    changeItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalCost = state.items.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalCost = state.items.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCost = 0;
    },
    loadCartFromLocalStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalCost = state.items.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setTotalCost: (state) => {
      state.totalCost = state.items.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCartFromLocalStorage,
  toggleCart,
  setCartStatus,
  setTotalCost,
  changeItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
