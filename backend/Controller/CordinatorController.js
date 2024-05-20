const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cordinatorModel = require("../Model/CordinatorSchema");
const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const setToken = require("../utils/jsonWebToken");
const fypModel = require("../Model/StudentRegistrationFYPSchema");
const { CountryCodes } = require("validator/lib/isISO31661Alpha2");

// REGISTER CORDINATOR
exports.registerCordinator = asyncErr( async (req, res, next)=>{
    const {name, email, password} =req.body;

    //FILLING THE FIELDS
    if(!name || !email || !password){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const Cordinator = await cordinatorModel.findOne({ email });

    if(Cordinator === null){
        await cordinatorModel.create({name, email, password});
        res.status(201).json({
            success: true,
            message: "Account created Succesfully"
        })
    }else{
        res.status(406).json({
            message: "Cordinator already exists"
        });
    }
});

//LOGIN CORDINATOR
exports.loginCordinator = asyncErr(async(req, res, next)=>{

    const {email, password} = req.body;
    

    //FILLING ALL THE FIELDS
    if(!email || !password){
        return next(new ErrorHandler("Please fill all the fields", 401));
    }
    const user = await cordinatorModel.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //VALIDATE PASSWORD
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    setToken(user, 200, res)
});

//LOGOUT CORDINATOR
exports.logoutCordinator = asyncErr(async(req, res, next)=>{
   res.cookie("token", null,{
    // expires: new Date(Date.now() + 10 * 10
    expires: new Date(Date.now()),
    httpOnly: true
   }) ;

   res.status(200).json({
    success:true,
    message: "Logged Out Successfully"
   });
});

//GET Cordinator DETAILS
exports.getCordinatorDetails = asyncErr(async(req, res)=>{

    const user  = await cordinatorModel.findById(req.Coordinator.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// GET ALL COORDINATOR -
exports.getCoordinator = asyncErr(async(req, res) => {
    const coordinators = await cordinatorModel.find();

    res.status(200).json({
        success: true,
        coordinators,
    });
});


// CREATE Announcemnt
exports.createAnnouncement = asyncErr(async (req, res, next) => {

    const {title, date} = req.body;
   

    if (!title || !date ) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const coordinator = await cordinatorModel.findById(req.Coordinator.id);
    
    // Create  new announcement 
    const announcements = {
        title,
        date
    };
    coordinator.Announcement.push(announcements);
    await coordinator.save();
    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: announcements,
    });
});

 // // DELETE announcement
 exports.deleteAnnouncement = asyncErr(async(req, res, next)=>{

    const AnnouncementId = req.params.id;
    let deletedAnnouncement = await cordinatorModel.findByIdAndDelete(AnnouncementId);
    res.status(200).json({
        success: true,
        message: 'Deleted Successfully',
        data: deletedAnnouncement,
    });
 });

 // GET ALL ANNOUNCEMENTS
exports.getAllAnnouncement = asyncErr(async(req, res)=>{
    const announcements = await cordinatorModel.find().select("Announcement");
    res.status(200).json({
        success: true,
        data : { announcements }
    });
});

// GET ALL REGISTERED FYPS -
exports.getAllRegFyp = asyncErr(async (req, res) => {

    const fyp = await fypModel.find();

    res.status(200).json({
        success: true,
        fyp
    });
}); 