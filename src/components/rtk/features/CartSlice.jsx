import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
    : 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
    ? JSON.parse(localStorage.getItem("cartTotalAmount"))
    : 0,
    
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.cartTotalQuantity++;
      state.cartTotalAmount += newItem.price;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
        toast.success("Product added to cart");
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        toast.success("Item quantity has been updated");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.cartTotalQuantity--;
      state.cartTotalAmount -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        toast.success("Product item removed from cart");
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        toast.success("Item quantity has been updated ");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.success("Cart cleared successfully");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    clearCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      const decrementquantity = existingItem.quantity;
      state.cartTotalQuantity-= decrementquantity;
      state.cartTotalAmount -= existingItem.totalPrice;
      if (existingItem.quantity >= 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        toast.success("Product item removed from cart ");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    calculateShipping(state) {
        if (state.cartTotalAmount <= 25) {
            return 1.5;
        } else {
            return state.cartTotalAmount * 10 / 100;
        }        
        },
        
  },
});

export const { addToCart, removeFromCart, clearCart, clearCartItem, calculateShipping } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
