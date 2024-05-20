// PARTIALS -
// const server = "https://fyp-portal-eight.vercel.app/fyp";
const customServer = `http://localhost:8000/fyp`;

// COMMON -
export const FORGOT_PASSWORD = `${customServer}/password/forgot`
export const RESET_PASSWORD = `${customServer}/password/reset`

// USER -
export const REGISTER_USER = `${customServer}/registerStudent`;
export const LOGIN = `${customServer}/loginStudent`;
export const COORDINATOR_LOGIN = `${customServer}/loginCordinator`;
export const SUPERVISOR_LOGIN = `${customServer}/loginSupervisor`;
export const LOGOUT = `${customServer}/logoutStudent`;
export const LOAD_USER = `${customServer}/student/me`;
export const COORDINATOR_ME = `${customServer}/cordinator/me`;
export const SUPERVISOR_ME = `${customServer}/supervisor/me`;

// STUDENT -
export const REGISTER_STUDENT_FYP = `${customServer}/registration`;
export const STUDENT_FYP_1 = `${customServer}/fyp1`;
export const STUDENT_FYP_2 = `${customServer}/fyp2`;
export const STUDENT_FYP_3 = `${customServer}/fyp3`;
export  const STUDENT_SUPERVISORS = `${customServer}/supervisor/all`

// COORDINATOR -
export const COORDINATOR_CREATE_ANNOUNCEMENT = `${customServer}/createAnnouncement`;
export const COORDINATOR_REGISTER_SUPERVISOR = `${customServer}/registerSupervisor`;
export const COORDINATOR_STUDENTS_FYP = `${customServer}/cordinator/fyp`; // All students fyp

// SUPERVISOR -
export const SUPERVISOR_REQUESTS = `${customServer}/supervisor/fyps`;

