const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    first_name : {type : String , required : true} ,
    last_name : {type : String , required : true} ,
    email : {type : String , required : true} ,
    password : {type : String , required : true},
    passwordResetToken : {type : String},
    passwordExpirationToken : {type : Date}
}, {timestamps : true})

module.exports = mongoose.model("User" , userSchema) ; 