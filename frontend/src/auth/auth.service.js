import { API_BASE_URL } from "../config/serverApiConfig.js";
import axios from "axios";
import successHandler from "../request/successHandler.js";
import errorHandler from "../request/errorHandler.js";

export const register = async ({ registerData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `register`, registerData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    errorHandler(error);
    return { data: error.response.data, status: 409 };
  }
};

export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `login?timestamp=${new Date().getTime()}`,
      loginData,
      { withCredentials: true }
    );

    const { status, data, cookie } = response;
    console.log(response);
    console.log(cookie);

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    errorHandler(error);
    return { data: error.response.data, status: 409 };
  }
};

export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      API_BASE_URL + `logout?timestamp=${new Date().getTime()}`
    );
    const { status, data } = response;
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    errorHandler(error);
  }
};
