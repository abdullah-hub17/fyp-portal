// PARTIALS -
const server = "https://fyp-portal-eight.vercel.app/fyp";

// COMMON -
export const FORGOT_PASSWORD = `${server}/password/forgot`

// USER -
export const REGISTER_USER = `${server}/registerStudent`;
export const LOGIN = `${server}/loginStudent`;
export const COORDINATOR_LOGIN = `${server}/loginCordinator`;
export const SUPERVISOR_LOGIN = `${server}/loginSupervisor`;
export const LOGOUT = `${server}/logoutStudent`;
export const LOAD_USER = `${server}/student/me`;
export const COORDINATOR_ME = `${server}/cordinator/me`;
export const SUPERVISOR_ME = `${server}/supervisor/me`;

// STUDENT -
export const REGISTER_STUDENT_FYP = `${server}/registration`;
export const STUDENT_FYP_1 = `${server}/fyp1`;
export const STUDENT_FYP_2 = `${server}/fyp2`;
export const STUDENT_FYP_3 = `${server}/fyp3`;
export  const STUDENT_SUPERVISORS = `${server}/supervisor/all`

// COORDINATOR -
export const COORDINATOR_CREATE_ANNOUNCEMENT = `${server}/createAnnouncement`;
export const COORDINATOR_REGISTER_SUPERVISOR = `${server}/registerSupervisor`;
export const COORDINATOR_STUDENTS_FYP = `${server}/cordinator/fyp`; // All students fyp

// SUPERVISOR -
export const SUPERVISOR_REQUESTS = `${server}/supervisor/fyps`;

