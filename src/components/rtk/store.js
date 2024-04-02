import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/CartSlice";
import { productReducer } from "./features/ProductSlice";
import { productApi } from "./features/Apis/ProductApi";
import { categoriesApi } from "./features/Apis/CategoryApi";
import { orderApi } from './features/Apis/OrderApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
        
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApi.middleware).concat(categoriesApi.middleware).concat(orderApi.middleware)
    },
});