const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MappingSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  productId:{
    type:String,
    required:[true,'Please provide productId'],
    unique:true
  },
  isOn:{
    type:Boolean,
    default:false
  }
  
});


module.exports = mongoose.model("Mapping", MappingSchema);
