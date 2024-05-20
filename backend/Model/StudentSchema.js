const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add user name"]
    },
    email: {
        type: String,
        require: [true, "please add user email"],
        unique: [true, "email address already taken"],
        index: true,
        sparse: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        require: [true, "please add user password"],
        select: false
    },
    cgpa: {
        type: String,
        default: null
        // required: [true, "Please "]        
    },
    role: {
        type: String,        
        default: "student",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamp: true
});

// MODIFY PASSWORD -
StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

// JWT TOKEN -
StudentSchema.methods.generateJwt = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// COMPARE PASSWORD -
StudentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// GENERATE PASSWORD RESET TOKEN -
StudentSchema.methods.ResetPasswordToken = function () {
    const reset_token = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(reset_token)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return reset_token;
  };
 

module.exports = mongoose.model("Student", StudentSchema);