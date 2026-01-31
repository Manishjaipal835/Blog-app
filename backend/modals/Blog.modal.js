const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
  title:{
    type:String,
    required:[true,'title is required']
  },content:{
    type:String,
    required:true
  },images:{
    type:[String],
  },userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userid',
   
  },writtenBy:{
    type:String,
  }
}, {timestamps:true})


const blog = mongoose.model("blog",blogSchema);
module.exports =blog