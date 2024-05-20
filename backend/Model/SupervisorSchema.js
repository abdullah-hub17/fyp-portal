const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto =  require("crypto");

const supervisorSchema = mongoose.Schema({
    name :{
        type: String,
        required: [true, "Please provide Supervisor Name"],
    },
    email:{
        type: String,
        required: [true,"Please provide Supervisor Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"]
    },
    password:{
        type: String,
        required:[true, "Please Provide Supervisor Password"],
        select: false
    },
    role: {
        type: String,        
        default: "supervisor",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// MODIFY PASSWORD 
supervisorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

// JWT TOKEN
supervisorSchema.methods.generateJwt = function (){
    return jwt.sign({ id : this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//COMPARE PASSOWRD
supervisorSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password) ;
}

//GENERATE PASSWORD RESET TOKEN
supervisorSchema.methods.ResetPasswordToken = function () {
    const reset_token = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
    .createHash("sha56")
    .update(reset_token)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return reset_token;
};
module.exports = mongoose.model("Supervisor", supervisorSchema);
