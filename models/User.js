const mongoose = require('mongoose');
let  UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    age: Number,
    addres: String,
    email:String
  })
  
  module.exports =UserModel= mongoose.model('user', UserSchema)