const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName : {
    type : String ,
    required : true,
    trim : true
   },
   lastName : {
    type : String ,
    required : true,
    trim : true
   },
   email : {
    type : String,
    unique : true,
    required : true,
    trim : true
   }, 
   phoneNo : {
    type : String,
    unique : true,
    required : true,
    trim : true,
    maxLength : 10,
    match: /^\d{10}$/
   }, 
   password : {
    type : String,
    required : true,
    trim : true,
    select:false
   } ,
   role: { type: String, enum: ["admin", "client"], required: true, lowercase: true }

},{timestamps : true});

const User =  mongoose.model("User",userSchema);

module.exports = User;