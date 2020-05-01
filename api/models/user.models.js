const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name:{
    type: String ,
    required: true
  },
  password:{
    type: String ,
    required: true
  },
  email:{
    type: String ,
    required: true,
    unique: true,
    index: true
  },
  username:{
    type: String ,
    required: true
  },
  roles: [{
    project_name: String,
    permissions: Array
  }]
})

const User = mongoose.model('User',userSchema,'user');

module.exports = User;