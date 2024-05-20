// IMPORTS -
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/Auth";
import { forgotPassword, studentReducer } from "./reducers/StudentReducer.js";
import { CoordinatorReducer } from "./reducers/CoordinatorReducer.js";
import { SupervisorReducer } from "./reducers/SupervisorReducer.js";

const store = configureStore({
   
    reducer: {
AUTH: authReducer,
STUDENT_FYP_REGISTRATION: studentReducer,
STUDENT_FYP_1: studentReducer,
STUDENT_FYP_2: studentReducer,
STUDENT_FYP_3: studentReducer,
COORDINATOR_CREATE_ANNOUNCEMENT: CoordinatorReducer,
COORDINATOR_STUDENTS : CoordinatorReducer,
SUPERVISOR: SupervisorReducer,
FORGOT_PASSWORD: forgotPassword


},
});

export default store;