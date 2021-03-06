const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../utils/config.js');
const ErrorHelper = require("../../utils/errors");


module.exports = (req,res,next) => {
  try{

    const token = req.cookies['token'];
    const decoded = jwt.verify(token, JWT_KEY);
    
    
    next(decoded);
  }
  catch(error){
    console.log("FROM JWT")
    ErrorHelper.unauthorisedError(next, "You are not logged in")
  }
}