const User = require("../models/user.models");
const ErrorHelper = require("../../utils/errors");

exports.USER_SIGN_IN = async (req,res,next) => {
  const { email,password } = req.body;

  User.findOne({email:email}, (err, user) =>{
    if(err) return false; 
    if(!user || user.password !== password){
      ErrorHelper.unauthorisedError(res);
    }else{
      res.json({
        "email": user.email,
        "password": user.password
      })
    }
  })
}

exports.USER_SIGN_UP = async (req,res,next) => {
  const { email,password,name,username } = req.body;

  const user = await User.findOne({email: email})
  if(user){
    ErrorHelper.badRequesterror(res, "Resource Conflict"); 
  }else{
    await User.create({
        email,
        password,
        name,
        username
      })
      .then((resource) => {
        res.status(201).json(
          {
            resource: resource,
            message: "Success Created"
          }
        )
      })
      .catch((err) => {
        const errmsg = err.message
        ErrorHelper.internalServerError(res,errmsg)
      })
  }
}