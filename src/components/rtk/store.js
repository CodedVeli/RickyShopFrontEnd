import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/CartSlice";
import { productReducer } from "./features/ProductSlice";
import { productApi } from "./features/Apis/ProductApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApi.middleware);
    },
});