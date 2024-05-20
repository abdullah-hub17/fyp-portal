const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createExamModel = require("../Model/CreateExamSchema");
const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const setToken = require("../utils/jsonWebToken");

// Create Exam Controller 
exports.createExam = asyncErr(async(req, res, next)=>{

    const {examname, examtype} = req.body;

    //FILLING THE FIELDS
    if(!examname || !examtype){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    await createExamModel.create({
        examname,
        examtype
    });
    res.status(201).json({
        success: true,
        message: "Exam Created Successfully"
    });
});

// Schedule Exam Controller 
exports.scheduleExam = asyncErr(async(req, res, next)=>{

    const {examtype, date, time} = req.body;

    //FILLING THE FIELDS
    if(!examtype || !date || !time){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    await createExamModel.create({
        examtype,
        date,
        time
    });
    res.status(201).json({
        success: true,
        message: "Exam Schedule Created Successfully"
    });
});


// Exam Question Controller 
exports.examQuestion = asyncErr(async(req, res, next)=>{

    const {Question} = req.body;

    //FILLING THE FIELDS
    if(!Question){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const alreadyQuestion = await createExamModel.findOne({Question});

    if (alreadyQuestion ==  null){
        const newQuestion = await createExamModel.create({Question});
        const id = newQuestion._id;
        const questionObject = {
            _id : id ,
            Question: Question
        };
        return res.status(201).json({
            success:true,
            data:questionObject,
            message:"New Question Added Successfully",
        });
    }else{
        res.status(400).json({
            success:false,
            message:"This Question is Already in our Database.",
        });
    }
});