const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../Model/AdminSchema");
const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const setToken = require("../utils/jsonWebToken");

//REGISTER ADMIN
exports.registerAdmin = asyncErr(async(req, res, next)=>{

    const {name, email, password} = req.body;

    // FILLING ALL THE FIELDS
    if(!name || !email || !password){
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    const admin = await adminModel.findOne({email});
    if(admin === null){
        await adminModel.create({name, email, password});
        res.status(201).json({
            success: true, 
            message: "Account Created Successfully"
        });
    }else {
        res.status(406).json({
            message: "Admin already exists"
        });
    }
});

// LOGIN ADMIN
exports.loginAdmin = asyncErr(async(req, res, next)=>{
    const {email, password} = req.body;

    // FILLING ALL THE FIELDS
    if(!email || !password){
        return next( new ErrorHandler("Please fill all the fields", 401));
    }

    const admin = await adminModel.findOne({email}).select("+password");

    if(!admin){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // VALIDATE PASSWORD 
    const isPasswordMatched = await admin.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    setToken(admin, 200, res)
});

// LOGOUT ADMIN 
exports.logoutAdmin = asyncErr(async(req, res, next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Loggout Sucessfully"
    });
});

// GET ADMIN DETAILS
exports.getAdminDetails = asyncErr(async(req, res)=>{
    const admin = await adminModel.findById(req.admin.id);

    res.status(200).json({
        sucess: true,
        user,
    });
});
