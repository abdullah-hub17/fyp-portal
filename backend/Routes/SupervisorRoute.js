const express = require("express");
const {registerSupervisor, loginSupervisor, getSupervisorDetails, logoutSupervisor, getSupervisors, getcurrentFyp} = require("../Controller/SupervisorController")
const {authenticateSupervisor} = require("../Middleware/auth");
const { getAllSupervisorReq } = require("../Controller/StudentRegistrationFYPController");

const router = express.Router();

router.post("/loginSupervisor", loginSupervisor);
router.get("/logoutSupervisor", logoutSupervisor);
router.route("/supervisor/me").get(authenticateSupervisor, getSupervisorDetails);
router.route("/supervisor/requests").get(authenticateSupervisor, getAllSupervisorReq);
router.route("/supervisor/all").get(getSupervisors);
router.route("/supervisor/fyps").get(authenticateSupervisor, getcurrentFyp)

module.exports = router;