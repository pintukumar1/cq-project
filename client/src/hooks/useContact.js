import { useContext } from "react";
import { ContactContext } from "../contexts/contact/contact.context";
import * as types from "../contexts/contact/contact.types";
import axios from "axios";
import { API_URL } from "../config/api";

const useContact = () => {
  const { state, dispatch } = useContext(ContactContext);
  const { contacts, currentContact, loading } = state;

  const getContacts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/contacts`);
      dispatch({ type: types.GET_CONTACTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async contactObj => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        `${API_URL}/api/contacts`,
        contactObj,
        config
      );
      dispatch({
        type: types.ADD_CONTACT,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async id => {
    try {
      await axios.delete(`${API_URL}/api/contacts/${id}`);
      dispatch({ type: types.DELETE_CONTACT, id });
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentContact = contact => {
    dispatch({ type: types.SET_CURRENT_CONTACT, payload: contact });
  };

  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `${API_URL}/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: types.UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const clearCurrentContact = () => {
    dispatch({ type: types.CLEAR_CURRENT_CONTACT });
  };

  return {
    loading,
    getContacts,
    clearCurrentContact,
    updateContact,
    addContact,
    contacts,
    deleteContact,
    setCurrentContact,
    currentContact
  };
};

export default useContact;
