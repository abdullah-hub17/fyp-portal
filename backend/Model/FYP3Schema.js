const mongoose = require("mongoose");

const FYP3_Schema =mongoose.Schema({
    fileUrl:{
        type : String,
        required : true,
    }
},{
    timestamps:true
});

module.exports = mongoose.model("FYP 3", FYP3_Schema);