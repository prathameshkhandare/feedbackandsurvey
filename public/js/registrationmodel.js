const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: String,
  accountType: String,
  age:Number,
  bio:String,
  password:String,
email:String
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
