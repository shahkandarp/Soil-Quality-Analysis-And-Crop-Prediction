const express = require("express");
const User = require("../models/User");
const Mapping = require('../models/Mapping')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const bcrypt = require('bcryptjs')
const Data = require('../models/Data')

const registerUser = async (req, res) => {
  var { name, email, password,phoneno,productId } = req.body;
  if (!email || !name || !password || !phoneno || !productId) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const userx = await User.findOne({email})
  if(userx){
    throw new BadRequestError("This Email Already Exists");
  }
  const mappingCheck = await Mapping.findOne({productId})
  if(mappingCheck){
    throw new BadRequestError("This Product Is Already Mapped");
  }
  var obj = {}
  obj.email = req.body.email 
  obj.phoneno = req.body.phoneno
  obj.password = req.body.password
  obj.name = req.body.name
  obj.Role = 'CUSTOMER'
  const user = await User.create(obj);
  // const token = user.createJWT();
  obj = {}
  obj.productId = req.body.productId
  obj.userId = user._id
  const mapping = await Mapping.create(obj)
  res
    .status(StatusCodes.CREATED)
    .json({ res:'Success' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id,role:user.Role }, token });
};

const updateUser = async(req,res) => {
  const {userId} = req.user
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const userPassword = await User.findOneAndUpdate(
    { _id: userId },
    { password:req.body.password },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  }
  const user = await User.findOneAndUpdate({_id:userId},req.body,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:user})
}


const okButton = async (req,res) => {
  const {userId} = req.user
  const mapping = await Mapping.findOne({userId})
  mapping.isOn = true
  const mappingUpdates = await Mapping.findOneAndUpdate({userId},mapping,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:mappingUpdates})
}

const productStatus = async (req,res) => {
  const {productId} = req.params
  if(!productId){
    throw new BadRequestError("Please Provide Product ID");
  }
  const mapping = await Mapping.findOne({productId})
  res.status(StatusCodes.OK).json({res:'Success',data:mapping})
}

const setMappingTo0 = async (req,res) => {
  const {productId} = req.params
  if(!productId){
    throw new BadRequestError("Please Provide Product ID");
  }
  const mapping = await Mapping.findOne({productId})
  mapping.isOn = false
  const mappingUpdates = await Mapping.findOneAndUpdate({productId},mapping,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:mappingUpdates})
}

const getOutput = async (req,res) => {
  const {userId} = req.user
  const user = await Mapping.findOne({userId})
  const currtime = new Date()
  currhour = currtime.getHours();
  currminuite = currtime.getMinutes();
  curryear = currtime.getHours();
  currmonth = currtime.getMonth()+1;
  currdate = currtime.getDate();
  const data = Data.find({productId:user.productId}).sort({_id:-1}).limit(1)
  const answer = await data
  const datatime = new Date(answer[0].time)
  datahour = datatime.getHours()
  dataminuite = datatime.getMinutes();
  datayear = datatime.getHours();
  datamonth = datatime.getMonth()+1;
  datadate = datatime.getDate();
  if(currhour == datahour && curryear == datayear && currmonth == datamonth && datadate == currdate && (Math.abs(currminuite - dataminuite) == 0 || Math.abs(currminuite - dataminuite) == 1)){
    res.status(StatusCodes.OK).json({res:'Success',data:answer})
  }
  throw new BadRequestError('Please Make Sure your Device is Switched On Before Trying Again')
  
}
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  okButton,
  productStatus,
  setMappingTo0,
  getOutput
};
