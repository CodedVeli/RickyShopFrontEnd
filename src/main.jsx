import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter as Router } from 'react-router-dom';
import { store } from "./components/rtk/store";
import { Provider } from "react-redux";
import {AuthProvider} from './utils/Auth'

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
