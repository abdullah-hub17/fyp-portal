const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const crypto = require("crypto");

const AdminSchema =  mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please provide Admin name"]
    },
    email:{
        type: String,
        required:[true, "Please provide Admin email"],
        // validate: [validator.isEmail, "Please Enter a valid email"],
        unique: [true, "This email is already registered"],
    },
    password:{
        type: String,
        required:[true, "Please provide Admin password"],
        select: false
    },
    role:{
        type:String,
        default: "admin"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    createdAt:{
        type: Date,
        default:  Date.now(),
    }
});

// MODIIFY PASSWORD
AdminSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password =  await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
AdminSchema.methods.generateJwt = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// COMPARE PASSWORD
AdminSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

// GENERATE PASSWORD TOKEN
AdminSchema.methods.ResetPasswordToken = function(){
    const reset_token = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
    .createHash("sha56")
    .update(reset_token)
    .digest("hex");

    this.resetPasswordToken = Date.now() + 15 * 60 * 1000;
    return reset_token;
}

module.exports = mongoose.model("Admin", AdminSchema)
