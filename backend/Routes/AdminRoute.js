const express = require("express");
const { loginAdmin, getAdminDetails, registerAdmin, logoutAdmin } = require("../Controller/AdminController");
const {registerCordinator} = require("../Controller/CordinatorController");
const { authenticateAdmin} = require("../Middleware/auth");

const router = express.Router();

router.post("/loginAdmin", loginAdmin);
router.post("/registerCordinator", registerCordinator);
router.get("/logoutAdmin", logoutAdmin);
router.route("/admin/me").get(authenticateAdmin, getAdminDetails);

//  DO NOT ADD THIS ON FRONTEND
router.post("/registerAdmin", registerAdmin);

module.exports = router;