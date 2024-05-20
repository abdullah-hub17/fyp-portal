import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    error: null,
    loading: null,
    message: null,
    success: null,
    fyp: null
    
  };


  export const CoordinatorReducer = createReducer(initialState, {
  

    //COORDINATOR CREATE ANNOUNCEMENT -
    COORDINATOR_CREATE_ANNOUNCEMENT_REQUEST: (state) => {
        state.loading = true;
      },
      COORDINATOR_CREATE_ANNOUNCEMENT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      },
      COORDINATOR_CREATE_ANNOUNCEMENT_FAIL: (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      },

//COORDINATOR REGISTER SUPERVISOR -
COORDINATOR_REGISTER_SUPERVISOR_REQUEST: (state) => {
  state.loading = true;
},
COORDINATOR_REGISTER_SUPERVISOR_SUCCESS: (state, action) => {
  state.loading = false;
  state.message = action.payload.message;
  state.success = action.payload.success;
},
COORDINATOR_REGISTER_SUPERVISOR_FAIL: (state, action) =>{
  state.loading = false;
  state.error = action.payload;
},

//COORDINATOR  GET STUDENTS NAMES -
COORDINATOR_STUDENTS_REQUEST: (state) => {
  state.loading = true;
},
COORDINATOR_STUDENTS_SUCCESS: (state, action) => {
  state.loading = false;
  state.fyp = action.payload;
},
COORDINATOR_STUDENTS_FAIL: (state, action) => {
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
    