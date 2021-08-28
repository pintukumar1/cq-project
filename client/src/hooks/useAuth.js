import { useContext } from "react";
import { AuthContext } from "../contexts/auth/auth.context";
import * as types from "../contexts/auth/auth.types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { API_URL } from "../config/api";

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { token, currentUser, isAuthenticated, error, loading } = state;

  const setCurrentUser = async () => {
    const token = localStorage.token;
    if (token) {
      setAuthToken(token);
    }
    try {
      const { data } = await axios.get(`${API_URL}/api/auth`);
      dispatch({ type: types.SET_CURRENT_USER, payload: data });
    } catch (error) {
      dispatch({ type: types.AUTH_FAIL });
    }
  };

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios({
        method: "post",
        url: `${API_URL}/api/auth`,
        data: {
          email,
          password
        },
        config
      });
      const { data } = res;
      localStorage.setItem("token", data.token);
      dispatch({ type: types.AUTH_SUCCESS, payload: data.token });
      setCurrentUser();
    } catch (error) {
      dispatch({
        type: types.AUTH_FAIL,
        payload: "Email/ Password is incorrect"
      });
    }
  };

  const register = async userObj => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios({
        method: "post",
        url: `${API_URL}/api/users`,
        data: userObj,
        config
      });
      const { data } = res;
      localStorage.setItem("token", data.token);
      dispatch({ type: types.AUTH_SUCCESS, payload: data.token });
      setCurrentUser();
    } catch (error) {
      console.log(error);
      dispatch({ type: types.AUTH_FAIL });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
  };

  return {
    loading,
    logout,
    register,
    token,
    login,
    currentUser,
    setCurrentUser,
    isAuthenticated,
    error
  };
};

export default useAuth;
