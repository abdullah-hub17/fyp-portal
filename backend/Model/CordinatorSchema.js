const mongoose =  require("mongoose");
const jwt =  require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto =  require("crypto");
const { stringify } = require("querystring");

const cordinatorSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide Cordinator name"],
    },
    email:{
        type:String,
        required: [true, "Please provide Cordinator email"],
        // validate: [validator.isEmail, "Please Enter a valid email"]
        unique: [true, "This email is already registered"],
    },
    password: {
        type: String,
        required: [true, "Please provide Cordinator password"],
        select: false
    },
    role:{
        type:String,
        default:"coordinator",
    },
    Announcement:[{
        title:{
            type: String,
        },
        date:{
            type: String,
        }
    }],
    resetPassworsToken: String,
    resetPasswordExpire: Date,
    
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

//MODIFY PASSWORD
cordinatorSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
cordinatorSchema.methods.generateJwt = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//COMPARE PASSWORD
cordinatorSchema.methods.comparePassword = async function (Password){
    return await bcrypt.compare(Password, this.password);

}

//GENERATE PASSWORD TOKEN
cordinatorSchema.methods.ResetPasswordToken = function () {
    const reset_token = crypto.randomBytes(20).toString("hex");
    this.resetPassworsToken = crypto
    .createHash("sha56")
    .update(reset_token)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return reset_token;
};

module.exports = mongoose.model("Cordinator", cordinatorSchema)