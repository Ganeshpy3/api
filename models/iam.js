const mongoose = require("mongoose");
const iamSchema = new mongoose.Schema({
    "User_Email" : {
        type : String,
        required : true
    },
    "User_Password":{
        type : String,
        required : true
    },
    "Added_Time" :{
        type : Date,
        required : true,
        default : Date.now
    },
    "Modified_Time" :{
        type : Date,
    },
    "Last_Login" : {
        type : Date,

    }
});


const Accounts =mongoose.model("Accounts",iamSchema);
module.exports = Accounts;