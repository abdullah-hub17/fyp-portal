const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supervisorModel = require("../Model/SupervisorSchema");
const StudentFYPRegistrationModel = require("../Model/StudentRegistrationFYPSchema");
const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const setToken = require("../utils/jsonWebToken");

// REGISTER SUPERVISOR
exports.registerSupervisor = asyncErr( async (req, res, next)=>{
    const {name, email, password} = req.body;
   
    // FILLING THE FIELDS
    if(!name || !email || !password){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const user =  await supervisorModel.findOne({ email });

    if(user === null){
        await supervisorModel.create({name, email, password});
        res.status(201).json({
            success: true,
            message:"Account created successfully"
        });
    }else{
        res.status(406).json({
            message:"Supervisor already exits"
        });
    }
});


// LOGIN SUPERVISOR
exports.loginSupervisor = asyncErr(async (req, res, next)=>{
    
    const {email , password} = req.body;

    //FILLING ALL THE FIELD
    if(!email || !password){
        return next(new ErrorHandler("Please fill all the fields", 401));
    }

    const user = await supervisorModel.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //VALIDATE PASSWORD
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    setToken(user, 200, res)

});

//LOGOUT SUPERVISOR
exports.logoutSupervisor = asyncErr(async(req, res, next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message:"Logged Out Successfully"
    });
});

// GET USER DETAILS
exports.getSupervisorDetails = asyncErr(async(req, res)=>{
 
    const user = await supervisorModel.findById(req.supervisor.id);
    

    res.status(200).json({
        success: true,
        user,
    });
});

// GET ALL SUPERVISORS -
exports.getSupervisors = asyncErr(async(req, res) => {
    const supervisors = await supervisorModel.find();

    res.status(200).json({
        success: true,
        supervisors,
    });
});

// GET FYPs FOR SUPERVISOR -
exports.getcurrentFyp = asyncErr(async (req, res) => {

    const supervisor = await supervisorModel.findById(req.supervisor.id);
        
    if (!supervisor) {
        return res.status(404).json({
            success: false,
            message: 'Supervisor not found',
        });
    }

    const fyps = await StudentFYPRegistrationModel.find({ supervisorname: supervisor?.name });

    res.status(200).json({
        success: true,
        fyps,
    });

});

//ACCEPT AND REJECT REQUEST 
exports.statusRequest = asyncErr(async(req, res)=>{
    const statusRequest = await  StudentFYPRegistrationModel.findById({}) //  
})