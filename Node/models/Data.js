const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const DataSchema = new mongoose.Schema({
  productId:{
    type:String,
    default:''
  },
  lat:{
    type:mongoose.Decimal128,
    default:0
  },
  lng:{
    type:mongoose.Decimal128,
    default:0
  },
  N:{
    type:mongoose.Decimal128,
    default:0
  },
  P:{
    type:mongoose.Decimal128,
    default:0
  },
  K:{
    type:mongoose.Decimal128,
    default:0
  },
  pH:{
    type:mongoose.Decimal128,
    default:0
  },
  humidity:{
    type:mongoose.Decimal128,
    default:0
  },
  temprature:{
    type:mongoose.Decimal128,
    default:0
  },
  output:{
    type:String,
    default:''
  },
  time:{
    type:String,
    default:''
  }
},{timestamps:true});


module.exports = mongoose.model("Data", DataSchema);
