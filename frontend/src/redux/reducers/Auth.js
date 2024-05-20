// IMPORTS -
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: null,
  message: null,
  isAuth: null,
  success: null,
  user: null
};

export const authReducer = createReducer(initialState, {
  LOGIN_REQUEST: (state) => {
    state.loading = true;
    state.isAuth = false;
  },

  LOGIN_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.user = action.payload;
  },

  LOGIN_FAIL: (state, action) => {
    state.loading = false;
    state.isAuth = false;
    state.user = null;
    state.error = action.payload;   
    
  },

  REGISTER_REQUEST: (state) => {
    state.loading = true;
  },

  REGISTER_SUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  REGISTER_FAIL: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.error = action.payload;
  },

  LOAD_REQUEST: (state) => {
    state.loading = true;
    state.isAuth = false;
  },

  LOAD_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.user = action.payload;
  },

  LOAD_FAIL: (state, action) => {
    state.loading = false;
    state.isAuth = false;
    state.user = null;
    state.error = action.payload;
  },

  LOGOUT_SUCCESS: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuth = false;
    state.message = action.payload;
  },

  LOGOUT_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  CLEAR_ERRORS: (state) => {
    state.error = null;
  },

  CLEAR_MESSAGES: (state) => {
    state.message = null;
  }
});
