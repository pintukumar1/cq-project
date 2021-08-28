import * as types from "./auth.types";

export default (state, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return { ...state, token: action.payload, isAuthenticated: true };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        loading: false
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        currentUser: null,
        token: null,
        error: null
      };
    default:
      return state;
  }
};
