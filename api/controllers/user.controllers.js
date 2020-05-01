const User = require("../models/user.models");
const ErrorHelper = require("../../utils/errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../utils/config.js');

const saltRounds = 10;


exports.USER_SIGN_IN = async (req,res,next) => {
  const { email,password } = req.body;

  const user = await User.findOne({email: email});
  if(user){
    await bcrypt.compare(password, user.password, (err, comparedResult) => {
      if(err) ErrorHelper.unauthorisedError(res);
      if(comparedResult){
        //TODO: Change jwt alg to RS256
        const token = jwt.sign({
          email: email
        }, 
        JWT_KEY, { expiresIn: 86400})
        
        res.status(200).json({
          token: token
        })
      }
      else{
        ErrorHelper.unauthorisedError(res);
      }
    })
  }
  else{
    ErrorHelper.unauthorisedError(res);
  }
  
}

exports.USER_SIGN_UP = async (req,res,next) => {

  const { email,password,name,username } = req.body;
  (!email || !password || !name || !username) && ErrorHelper.badRequesterror(res,err);

  const user = await User.findOne({email: email})

  if(user){
    ErrorHelper.badRequesterror(res, "Resource Conflict"); 
  }
  else{
    await bcrypt
      .hash(password,saltRounds)
      .then( hash => {
        console.log(hash);
        if(hash){
          const currentUser = new User({
            email: email,
            password: hash,
            name: name,
            username: username
          })

          currentUser.save()
          .then(resource => {
            res.status(201).json(
              {
                resource: resource,
                message: "Success Created"
              }
            )
          })
          .catch(err => {
            const errmsg = err.message
            ErrorHelper.internalServerError(res,errmsg)
          })
        }
    })
  }
}

exports.USER_TEST_JWT = async (user, req,res,next) => {
  res.json(user);
  console.log(user)
}