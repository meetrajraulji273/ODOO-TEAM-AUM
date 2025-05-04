import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./Auth";

export const mainReducer = combineReducers({
  auth: authReducer,
});

