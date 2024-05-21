const express =  require("express");
const {registerStudent, loginStudent, logoutStudent, getStudentDetails, forgotPassword, resetPassword} = require("../Controller/StudentController")
const {RegisterStudentFYP, getStudentFYPRegistrationDetails } = require("../Controller/StudentRegistrationFYPController");
const {FYP1Data} = require("../Controller/FYP1Controller");
const {FYP2Data} = require("../Controller/FYP2Controller");
const {FYP3Data} = require("../Controller/FYP3Controller");
const {authenticate} = require("../Middleware/auth");
const {FYPRegistrationUpload, FYP1upload, FYP2upload, FYP3upload} =  require("../Middleware/FileUploadPath")

const router = express.Router();

router.post("/registerStudent", registerStudent);
// router.post("/loginStudent",loginStudent);
router.route("/loginStudent").post(loginStudent)
router.get("/logoutStudent",logoutStudent);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.get("/student/me",authenticate, getStudentDetails);

router.post("/registration",FYPRegistrationUpload.single("file") ,RegisterStudentFYP);
// router.get("/StudentRegistrationFYP/me").route(authenticate, getStudentFYPRegistrationDetails);
router.route("/StudentRegistrationFYP/me").get(authenticate, getStudentFYPRegistrationDetails);

router.post("/fyp1", FYP1upload.single("file"),FYP1Data);
router.post("/fyp2", FYP2upload.single("file"),FYP2Data);
router.post("/fyp3", FYP3upload.single("file"),FYP3Data);
//router.route("/student/all").get(getStudents);

module.exports =  router;