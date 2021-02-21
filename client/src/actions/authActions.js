import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types";
// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  // calls user loading method from the auth reducer
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((e) => {
      // returns any potential errors
      dispatch(returnErrors(e.response.data, e.response.status));
      // returns any auth related errors
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((e) => {
      dispatch(
        returnErrors(e.response.data, e.response.status, "REGISTER_FAIL")
      );

      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
//Login user
export const login = ({email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({email, password });
  axios
    .post("/api/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((e) => {
      dispatch(
        returnErrors(e.response.data, e.response.status, "LOGIN_FAIL")
      );

      dispatch({
        type: LOGIN_FAIL,
      });
    });
  }
// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// token helper function
export const tokenConfig = (getState) => {
  //Get token
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // if token add it to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // this returns the token if its there otherwise just regular headers
  return config;
};
