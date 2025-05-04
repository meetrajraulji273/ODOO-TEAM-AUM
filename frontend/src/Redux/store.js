import { configureStore } from "@reduxjs/toolkit";
import { mainReducer } from "./mainReducer";
import storePersist, { localStorageHealthCheck } from "./storePersist";

localStorageHealthCheck();

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const auth_state = storePersist.get("auth")
  ? storePersist.get("auth")
  : AUTH_INITIAL_STATE;

const initialState = { auth: auth_state };

const store = configureStore({
  reducer: mainReducer,
  preloadedState: initialState,
  devTools: true,
});

export default store;
