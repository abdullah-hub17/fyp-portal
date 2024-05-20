const mongoose = require("mongoose");

const FYP2_Schema =mongoose.Schema({
    fileUrl:{
        type : String,
        required : true,
    }
},{
    timestamps:true
});

module.exports = mongoose.model("FYP 2", FYP2_Schema);