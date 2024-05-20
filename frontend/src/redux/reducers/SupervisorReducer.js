import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    error: null,
    loading: null,
    message: null,
    success: null,
    fyps: null
  };


  export const SupervisorReducer = createReducer(initialState, {

    // SUPERVISOR RECEIVED STUDENTS PROPOSAL REQUESTS -
    SUPERVISOR_FYP_PROPOSAL_REQUEST: (state) => {
        state.loading = true;
      },
      SUPERVISOR_FYP_PROPOSAL_SUCCESS: (state, action) => {
        state.loading = false;
        state.fyps = action.payload;
      },
      SUPERVISOR_FYP_PROPOSAL_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
     
      // CLEAR ERRORS -
      CLEAR_ERRORS: (state) => {
        state.error = null;
      },
    
      CLEAR_MESSAGES: (state) => {
        state.message = null;
      }
    });
    