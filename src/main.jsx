import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "./components/rtk/store";
import { Provider } from "react-redux";
import {AuthProvider} from './utils/Auth'
import { fetchProduct } from "./components/rtk/features/ProductSlice.jsx";
import { productApi } from "./components/rtk/features/Apis/ProductApi.jsx";

// store.dispatch(fetchProduct())
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>      
    <AuthProvider>
    <Provider store={store}> 
      <App />
    </Provider>
    </AuthProvider>
    </Router>
  </React.StrictMode>
);
