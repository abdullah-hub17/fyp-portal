// IMPORTS -
const ErrorHandler = require("../utils/errorHandler");
const AsynErr = require("./asyncErr");
const jwt = require("jsonwebtoken");
const studentModel = require("../Model/StudentSchema");
const coordinatorModel = require("../Model/CordinatorSchema");
const supervisorModel = require("../Model/SupervisorSchema")

// AUTHENTICATE USER -
exports.authenticate = AsynErr(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.Student = await studentModel.findById(decodeData.id);

    next();
});

// AUTHENTICATE COORDINATOR -
exports.authenticateCoord = AsynErr(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.Coordinator = await coordinatorModel.findById(decodeData.id);

    next();
});

// AUTHENTICATE SUPERVISOR -
exports.authenticateSupervisor = AsynErr(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.supervisor = await supervisorModel.findById(decodeData.id);

    next();
});

exports.authenticateAdmin = AsynErr(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await supervisorModel.findById(decodeData.id);

    next();
});