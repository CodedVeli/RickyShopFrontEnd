import React, { createContext, useState, useContext } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("user_session"));

  const login = (token) => {
    Cookies.set("user_session", token, { expires: 7, path: "/", sameSite: 'None', secure: true });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("user_session");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



   