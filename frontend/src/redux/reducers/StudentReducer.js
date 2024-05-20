import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: null,
  message: null,
  success: null,
  supervisors: null,
};

export const studentReducer = createReducer(initialState, {
  //REGISTER STUDENT -
  REGISTER_STUDENT_FYP_REQUEST: (state) => {
    state.loading = true;
  },
  REGISTER_STUDENT_FYP_SUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.success = action.payload.success;
  },
  REGISTER_STUDENT_FYP_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // STUDENT FYP 1 -

  STUDENT_FYP_1_REQUEST: (state) => {
    state.loading = true;
  },
  STUDENT_FYP_1_SUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.success = action.payload.success;
  },
  STUDENT_FYP_1_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // STUDENT FYP 2 -

  STUDENT_FYP_2_REQUEST: (state) => {
    state.loading = true;
  },
  STUDENT_FYP_2_SUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.success = action.payload.success;
  },
  STUDENT_FYP_2_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // STUDENT FYP 3 -

  STUDENT_FYP_3_REQUEST: (state) => {
    state.loading = true;
  },
  STUDENT_FYP_3_SUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.success = action.payload.success;
  },
  STUDENT_FYP_3_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //STUDENT GET SUPERVISORS NAMES-
  STUDENT_SUPERVISORS_REQUEST: (state) => {
    state.loading = true;
  },
  STUDENT_SUPERVISORS_SUCCESS: (state, action) => {
    state.loading = false;
    state.supervisors = action.payload.supervisors;
  },
  STUDENT_SUPERVISORS_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

    // CLEAR ERRORS -
  CLEAR_ERRORS: (state) => {
    state.error = null;
  },

  CLEAR_MESSAGES: (state) => {
    state.message = null;
  },
});

export const forgotPassword = createReducer(initialState, {

  FORGOT_PASSWORD_REQUEST: (state, action) => {
    state.loading = true;
state.error = null;
  },
  
  FORGOT_PASSWORD_SUCCESS: (state, action) => {
    state.loading = true;
    state.message = action.payload
  },
  
  FORGOT_PASSWORD_FAIL: (state, action) =>{
    state.loading = false;
    state.error = action.payload;
  },
  
  // RESET PASSWORD
  
  // RESET_PASSWORD_REQUEST: (state, action) => {
  //   state.loading = true;
  //   state.error = null;
  // }, 
  
  // RESET_PASSWORD_SUCCESS: (state, action) => {
  // state.loading = false;
  // state.success = action.payload;
  // },
  
  // RESET_PASSWORD_FAIL: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },
  
  CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  
  })