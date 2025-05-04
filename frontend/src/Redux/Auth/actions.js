import * as actionTypes from "./types";
import * as authService from "../../auth/auth.service.js";

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    console.log("registerData", { registerData });
    const response = await authService.register({ registerData });

    const { status, data } = response;
    console.log("Response:", response);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
    } else {
      console.log("Error:", error);
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.login({ loginData });

    if (data && data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      };
      window.localStorage.setItem("auth", JSON.stringify(auth_state));
      window.localStorage.removeItem("isLogout");
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  const result = window.localStorage.getItem("auth");
  const tmpAuth = JSON.parse(result);
  window.localStorage.removeItem("auth");
  window.localStorage.setItem("isLogout", JSON.stringify({ isLogout: true }));
  const data = await authService.logout();
  console.log("data", data);
  if (data && data.success === true) {
    const auth_state = {
      current: tmpAuth,
      isLoggedIn: true,
      isLoading: false,
      isSuccess: true,
    };
    window.localStorage.setItem("auth", JSON.stringify(auth_state));
    window.localStorage.removeItem("isLogout");
    dispatch({
      type: actionTypes.LOGOUT_SUCCESS,
    });
  } else {
    dispatch({ type: actionTypes.LOGOUT_FAILED, payload: data.result });
  }
};
