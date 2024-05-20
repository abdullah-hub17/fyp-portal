// IMPORTS -
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../../utils/constants";
import {
  LOGIN,
  LOGOUT,
  REGISTER_USER,
  LOAD_USER,
  COORDINATOR_LOGIN,
  COORDINATOR_ME,
  SUPERVISOR_LOGIN,
  SUPERVISOR_ME,
} from "../../utils/paths";

// LOGIN -
export const login = (form, role) => async (dispatch) => {
  console.log(form, role);

  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    };

    if (role === "student") {
      const { data } = await axios.post(LOGIN, form, config);

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } else if (role === "coordinator") {
      const { data } = await axios.post(COORDINATOR_LOGIN, form, config);
      console.log(data)

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } else if (role === "supervisor") {
      const { data } = await axios.post(SUPERVISOR_LOGIN, form, config);

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
  } catch (err) {
    
    dispatch({
      type: LOGIN_FAIL,
      payload: err?.response?.data?.message,
    });
  }
};

// REGISTER -
export const register = (form) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    };

    const { data } = await axios.post(REGISTER_USER, form, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};










// STUDENT LOAD USER - 
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });
    const config = {
      withCredentials: true,
    };
    
      const { data } = await axios.get(LOAD_USER, config);

      dispatch({
        type: LOAD_SUCCESS,
        payload: data.user,
      });
    
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response?.data?.message,
    });
  }
};


// COORDINATOR LOAD USER -

export const loadCoordinator = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });
    const config = {
      withCredentials: true,
    };
    
      const { data } = await axios.get(COORDINATOR_ME, config);

      // console.log(data)

      dispatch({
        type: LOAD_SUCCESS,
        payload: data.user,
      });
    
  } catch (error) {
    
    dispatch({
      type: LOAD_FAIL,
      payload: error.response?.data?.message,
    });
  }
};






// SUPERVISOR LOAD USER -

export const loadSupervisor = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });
    const config = {
      withCredentials: true,
    };
    
      const { data } = await axios.get(SUPERVISOR_ME, config);

      dispatch({
        type: LOAD_SUCCESS,
        payload: data.user,
      });
    
  } catch (error) {
    
    dispatch({
      type: LOAD_FAIL,
      payload: error.response?.data?.message,
    });
  }
};






// LOGOUT -

export const logout = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(LOGOUT, config);

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message,
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
