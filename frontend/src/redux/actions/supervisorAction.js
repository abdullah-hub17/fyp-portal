import axios from "axios";
import {
  SUPERVISOR_FYP_PROPOSAL_REQUEST,
  SUPERVISOR_FYP_PROPOSAL_SUCCESS,
  SUPERVISOR_FYP_PROPOSAL_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  SUPERVISOR_PROPOSAL_REQUEST,
  SUPERVISOR_PROPOSAL_SUCCESS,
  SUPERVISOR_PROPOSAL_FAIL,
} from "../../utils/constants";
import { STUDENT_SUPERVISORS, SUPERVISOR_REQUESTS } from "../../utils/paths";

// SUPERVISOR HAVING FYP LISTS -
export const SUPERVISOR_FYP_PROPOSAL = (file) => async (dispatch) => {
  console.log(file);
  try {
    dispatch({
      type: SUPERVISOR_FYP_PROPOSAL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.get("http://localhost:8000/fyp/supervisor/fyps", config);
    console.log(data);

    dispatch({ type: SUPERVISOR_FYP_PROPOSAL_SUCCESS, payload: data.fyps });
  } catch (err) {
    dispatch({
      type: SUPERVISOR_FYP_PROPOSAL_FAIL,
      payload: err?.response?.data?.message,
    });
  }
};

// GET SUPERVISOR FOR DROP DOWN IN STUDENTS -
export const SUPERVISOR_FYP_REQUESTS = () => async (dispatch) => {
  try {
    dispatch({
      type: SUPERVISOR_PROPOSAL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      STUDENT_SUPERVISORS,

      config
    );
    console.log(data);

    dispatch({ type: SUPERVISOR_PROPOSAL_SUCCESS, payload: data.requests });
  } catch (err) {
    dispatch({
      type: SUPERVISOR_PROPOSAL_FAIL,
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
