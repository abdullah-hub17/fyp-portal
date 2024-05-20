const mongoose =  require("mongoose");

const StudentRegistrationFYPSchema = mongoose.Schema({
    supervisorname:{
        type: String,
        required: [true, "please select Supervisor name"]
    },
    projecttitle:{
        type: String,
        required: [true, "please add project title"]
    },
    teamleader1name:{
        type: String,
        required: [true, "please add team leader name "]
    },
    regid1:{
        type: Number,
        required:[true , "please add team leader registration id"],
    },
    gpa1:{
        type : String,
        required:[true, "please enter team leader gpa"]
    },
    member2name:{
        type: String,
        required: [true, "please add member 2 name "]
    },
    regid2:{
        type: Number,
        required:[true , "please add member 2 registration id"],
    },
    gpa2:{
        type : String,
        required:[true, "please enter member 2 gpa"]
    },
    member3name:{
        type: String,
        required: [true, "please add member 3 name "]
    },
    regid3:{
        type: Number,
        required:[true , "please add member 2 registration id"],
    },
    gpa3:{
        type : String,
        required:[true, "please enter member 3 gpa"]
    },
    fileUrl:{
        type : String,
       required : true,
    },

    status: {
        type: String,
        enum: ["accept", "reject", "pending"],
        default: "pending"
    },
    
},{
    timestamp: true
});
module.exports =  mongoose.model("StudentRegistrationFYP", StudentRegistrationFYPSchema);