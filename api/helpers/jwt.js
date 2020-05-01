const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../utils/config.js');
const ErrorHelper = require("../../utils/errors");

module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_KEY);

    next(decoded);
  }
  catch(error){
    ErrorHelper.unauthorisedError(res, "You are not logged in")
  }
}