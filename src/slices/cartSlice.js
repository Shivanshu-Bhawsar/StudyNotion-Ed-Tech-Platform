import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    setCart(state, action) {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setTotal(state, action) {
      state.total = action.payload;
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    resetCart(state) {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
    },
  },
});

export const { resetCart, setTotalItems, setCart, setTotal } = cartSlice.actions;
export default cartSlice.reducer;