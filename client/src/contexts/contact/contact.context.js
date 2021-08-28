import React, { createContext, useReducer, useMemo } from "react";
import reducer from "./contact.reducer";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const initialState = {
    contacts: [],
    currentContact: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
