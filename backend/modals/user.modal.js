const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,'user name is required'],
      trim:true
    },
    email:{
         type:String,
      required:[true,'user name is required'],
      trim:true
    },phone:{
       type:String,
      required:[true,'user name is required'],
      trim:true
    },password:{
       type:String,
      required:[true,'user name is required'],
      trim:true
    }
},{timestamps:true})


userSchema.pre('save',async function(next) {
     if(!this.isModified('password')){return next()}
     const hash = await bcrypt.hash(this.password,8);
     this.password = hash;
     next();
})


userSchema.methods.decodePassword = async function (password) {
  return bcrypt.compare(password,this.password);
}

userSchema.methods.jwtGenerate = function(){
  return jwt.sign({
    email:this.email,
    name:this.name
  },"sona")
}



const user = mongoose.model("user",userSchema);
module.exports = user;