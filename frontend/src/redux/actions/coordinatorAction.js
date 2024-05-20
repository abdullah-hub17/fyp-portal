import axios from "axios";
import {
  COORDINATOR_CREATE_ANNOUNCEMENT_REQUEST,
  COORDINATOR_CREATE_ANNOUNCEMENT_SUCCESS,
  COORDINATOR_CREATE_ANNOUNCEMENT_FAIL,
  COORDINATOR_REGISTER_SUPERVISOR_REQUEST,
  COORDINATOR_REGISTER_SUPERVISOR_SUCCESS,
  COORDINATOR_REGISTER_SUPERVISOR_FAIL,
  COORDINATOR_STUDENTS_REQUEST,
  COORDINATOR_STUDENTS_SUCCESS,
  COORDINATOR_STUDENTS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../../utils/constants";
import {
  COORDINATOR_CREATE_ANNOUNCEMENT,
  COORDINATOR_REGISTER_SUPERVISOR,
  COORDINATOR_STUDENTS_FYP,
} from "../../utils/paths";

// COORDINATOR CREATE ANNOUNCEMENT-
export const Coordinator_Create_Announcement =
  ({ date, title }) =>
  async (dispatch) => {
    console.log(
      date,

      title
    );
    try {
      dispatch({
        type: COORDINATOR_CREATE_ANNOUNCEMENT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        COORDINATOR_CREATE_ANNOUNCEMENT,
        {
          date,
          title,
        },
        config
      );
      console.log(data);

      dispatch({
        type: COORDINATOR_CREATE_ANNOUNCEMENT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // console.log(err.response.data.message)
      dispatch({
        type: COORDINATOR_CREATE_ANNOUNCEMENT_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };

// COORDINATOR REGISTER SUPERVISOR -
export const Coordinator_Register_SUPERVISOR =
  (formData) => async (dispatch) => {
    try {
      dispatch({
        type: COORDINATOR_REGISTER_SUPERVISOR_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        COORDINATOR_REGISTER_SUPERVISOR,
        formData,
        config
      );
      console.log("Response Data:", data);

      dispatch({
        type: COORDINATOR_REGISTER_SUPERVISOR_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.error("Error:", err);

      dispatch({
        type: COORDINATOR_REGISTER_SUPERVISOR_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };


// COORDINATOR GET THE LIST OF ALL STUDENTS -
export const Coordinator_Student_Fyp =
  () =>
  async (dispatch) => {
    
    try {
      dispatch({
        type: COORDINATOR_STUDENTS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(COORDINATOR_STUDENTS_FYP
        ,
        
        config
      );
      
      dispatch({ type: COORDINATOR_STUDENTS_SUCCESS, payload: data.fyp });
    } catch (err) {
      // console.log(err.response.data.message)
      dispatch({
        type: COORDINATOR_STUDENTS_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };



// CLEAR ERRORS -
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// CLEAR MESSAGES -
export const clearMessages = () => async (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};
