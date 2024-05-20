import axios from "axios";
import {
  REGISTER_STUDENT_FYP_REQUEST,
  REGISTER_STUDENT_FYP_SUCCESS,
  REGISTER_STUDENT_FYP_FAIL,
  STUDENT_FYP_1_REQUEST,
  STUDENT_FYP_1_SUCCESS,
  STUDENT_FYP_1_FAIL,
  STUDENT_FYP_2_REQUEST,
  STUDENT_FYP_2_SUCCESS,
  STUDENT_FYP_2_FAIL,
  STUDENT_FYP_3_REQUEST,
  STUDENT_FYP_3_SUCCESS,
  STUDENT_FYP_3_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  STUDENT_SUPERVISORS_REQUEST,
  STUDENT_SUPERVISORS_SUCCESS,
  STUDENT_SUPERVISORS_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL
} from "../../utils/constants";
import {
  REGISTER_STUDENT_FYP,
  STUDENT_FYP_1,
  STUDENT_FYP_2,
  STUDENT_FYP_3,
  STUDENT_SUPERVISORS,
  FORGOT_PASSWORD
} from "../../utils/paths";

// STUDENT FYP REGISTRATION -
export const Register_Student_FYP =
  ({
    supervisorname,
    projecttitle,
    teamleader1name,
    member2name,
    member3name,
    regid1,
    regid2,
    regid3,
    gpa1,
    gpa2,
    gpa3,
    file,
  }) =>
  async (dispatch) => {
    console.log(
      supervisorname,
      projecttitle,
      teamleader1name,
      member2name,
      member3name,
      regid1,
      regid2,
      regid3,
      gpa1,
      gpa2,
      gpa3,
      file
    );
    try {
      dispatch({
        type: REGISTER_STUDENT_FYP_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        REGISTER_STUDENT_FYP,
        {
          supervisorname,
          projecttitle,
          teamleader1name,
          member2name,
          member3name,
          regid1,
          regid2,
          regid3,
          gpa1,
          gpa2,
          gpa3,
          file,
        },
        config
      );
      console.log(data);

      dispatch({ type: REGISTER_STUDENT_FYP_SUCCESS, payload: data });
    } catch (err) {
      
      dispatch({
        type: REGISTER_STUDENT_FYP_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };

// STUDENT FYP 1 -
export const Student_FYP_1 =
  ( file ) =>
  async (dispatch) => {
    console.log(file);
    try {
      dispatch({
        type: STUDENT_FYP_1_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        STUDENT_FYP_1,
        {
          
          file,
        },
        config
      );
      console.log(data);

      dispatch({ type: STUDENT_FYP_1_SUCCESS, payload: data });
    } catch (err) {
     
      dispatch({
        type: STUDENT_FYP_1_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };






  
// STUDENT FYP 2 -
export const Student_FYP_2 =
( file ) =>
async (dispatch) => {
  console.log(file);
  try {
    dispatch({
      type: STUDENT_FYP_2_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      STUDENT_FYP_2,
      {
        
        file,
      },
      config
    );
    console.log(data);

    dispatch({ type: STUDENT_FYP_2_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STUDENT_FYP_2_FAIL,
      payload: err?.response?.data?.message,
    });
  }
};






// STUDENT FYP 3 -
export const Student_FYP_3 =
( file ) =>
async (dispatch) => {
  console.log(file);
  try {
    dispatch({
      type: STUDENT_FYP_3_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      STUDENT_FYP_3,
      {
        
        file,
      },
      config
    );
    console.log(data);

    dispatch({ type: STUDENT_FYP_3_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STUDENT_FYP_3_FAIL,
      payload: err?.response?.data?.message,
    });
  }
};



// SUPERVSIOR NAMES ON STUDENTS SUPERVISORS LIST IN  FYP REGISTRATON -
export const STUDENT_CURRENT_SUPERVISORS =
  ( file ) =>
  async (dispatch) => {
    console.log(file);
    try {
      dispatch({
        type: STUDENT_SUPERVISORS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(STUDENT_SUPERVISORS
        ,
        
        config
      );
      console.log(data);

      dispatch({ type: STUDENT_SUPERVISORS_SUCCESS, payload: data });
    } catch (err) {
      // console.log(err.response.data.message)
      dispatch({
        type: STUDENT_SUPERVISORS_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };

  export const forgotPassword = (email) => async (dispatch) => {

    try{
    
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
      });
    
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
    
      const {data} = await axios.post(FORGOT_PASSWORD, email, config)
    
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    
    }
    catch(err){
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: err.response.data.message,
      });
    }
    
    
    }

  
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
