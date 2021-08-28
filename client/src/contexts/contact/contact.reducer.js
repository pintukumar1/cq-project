import * as types from "./contact.types";

export default (state, action) => {
  switch (action.type) {
    case types.GET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case types.ADD_CONTACT:
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case types.DELETE_CONTACT:
      const contactId = action.id;
      const filteredContacts = state.contacts.filter(
        contact => contact._id !== contactId
      );
      return { ...state, contacts: filteredContacts };
    case types.UPDATE_CONTACT:
      const updatedContact = state.contacts.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );
      return { ...state, contacts: updatedContact };
    case types.SET_CURRENT_CONTACT:
      return { ...state, currentContact: action.payload };
    case types.CLEAR_CURRENT_CONTACT:
      return { ...state, currentContact: null };
    case types.CONTACT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
