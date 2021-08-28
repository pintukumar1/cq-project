import React, { createContext, useReducer, useMemo } from "react";
import reducer from "./auth.reducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    currentUser: null,
    isAuthenticated: false,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
