const express = require("express");
const {loginCordinator, logoutCordinator, getCordinatorDetails, createAnnouncement, deleteAnnouncement, getAllAnnouncement, getAllRegFyp } = require("../Controller/CordinatorController");
const {registerSupervisor} = require("../Controller/SupervisorController")
const {authenticateCoord} = require("../Middleware/auth");
const {createExam, scheduleExam, examQuestion} =  require("../Controller/CreateExamController");

const router  = express.Router();

router.post("/loginCordinator", loginCordinator);
router.post("/registerSupervisor", registerSupervisor);
router.get("/logoutCordinator", logoutCordinator);
router.route("/cordinator/me").get(authenticateCoord, getCordinatorDetails);
router.route("/cordinator/fyp").get(getAllRegFyp);

// Announcement ROUTE
router.post("/createAnnouncement/:id", createAnnouncement);
router.delete("/:id", deleteAnnouncement);
// router.put("/:id", updateAnnouncement);
router.get("Annoucment/All", getAllAnnouncement);

// create exam
router.post("/createExam", createExam);
// schdeule Exam
router.post("/scheduleExam", scheduleExam);
// Exam Question
router.post("/examQuestion", examQuestion);

module.exports = router;
