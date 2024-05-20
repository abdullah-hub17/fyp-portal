const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const StudentFYPRegistrationModel = require("../Model/StudentRegistrationFYPSchema");

exports.RegisterStudentFYP = asyncErr(async (req, res, next) => {

   const {
      supervisorname,
      projecttitle,
      teamleader1name,
      member2name,
      member3name,
      regid1,
      regid2,
      regid3,
      gpa1,
      gpa2,
      gpa3,
   } = req.body;

   // FILLING ALL THE FIELDS
   if (!supervisorname || !projecttitle || !teamleader1name || !member2name || !member3name || !regid1 || !regid2 || !regid3 || !gpa1 || !gpa2 || !gpa3 || !req.file ) {

      return next(new ErrorHandler("Please fill alls the fields", 400));
   }


   // FIND BY Supervisor Name
   const StudentFypRegister = await StudentFYPRegistrationModel.find({supervisorname: req.body.supervisorname });

   if(StudentFypRegister?.length === 3) {
      return next(new ErrorHandler("Supervisor already has 3 groups", 400));
   }

   fileUrl = req.file.path;
   await StudentFYPRegistrationModel.create({
      supervisorname,
      projecttitle,
      teamleader1name,
      member2name,
      member3name,
      regid1,
      regid2,
      regid3,
      gpa1,
      gpa2,
      gpa3,
      fileUrl: fileUrl
   })

      res.status(201).json({
         success: true,
         message: "Request sent to Supervisor",
      });
});

// GET STUDENT FYP REGISTERATION DETAILS
exports.getStudentFYPRegistrationDetails = asyncErr(async (req, res) => {
   const user = await StudentFYPRegistrationModel.findBYId(req.user.id);

   res.status(200).json({
      success: true,
      user,
   });
});

// GET ALL REQUESTS FOR SUPERVISOR -
exports.getAllSupervisorReq = asyncErr(async (req, res) => {
   const requests = await StudentFYPRegistrationModel.find(req.supervisor.name);

   res.status(200).json({
      success: true,
      requests,
   });
});