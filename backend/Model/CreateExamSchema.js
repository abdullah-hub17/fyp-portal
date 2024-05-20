const mongoose =  require("mongoose");

const createExamSchema = mongoose.Schema({
    examname: {
        type:String,
    },
    examtype: {
        type:String,
    },
    date: {
        type:Date,
    },
    time: {
        type:String,
    },
    Question: {
        type: [String],
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Create Exam", createExamSchema);