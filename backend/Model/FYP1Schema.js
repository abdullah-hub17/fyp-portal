const mongoose = require("mongoose");

const FYP1_Schema =mongoose.Schema({
    fileUrl:{
        type : String,
        required : true,
    }
},{
    timestamps:true
});

module.exports = mongoose.model("FYP 1", FYP1_Schema);