const { body, validationResult, ValidationChain } = require('express-validator');
const User = require("../models/user.models");

const base = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
  ,
  body('password')
    .isLength({min:6})
    .trim() 
    .escape(),
]

const signUp = base.concat([
  body('confirm_password')
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Password does not match"),
  body('name')
  .not()
  .isEmpty()
  .trim() 
  .escape()
  .matches("^[a-zA-Z0-9_]*$")
  .withMessage("Invalid Character"),
  body('username')
  .not()
  .isEmpty()
  .trim() 
  .escape()
  .matches("^[a-zA-Z0-9_]*$")
  .withMessage("Invalid Character")
])
 
/** JS Closure to create a generic and reusable function**/
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    res.status(422).json({ errors: extractedErrors });
  };
};

exports.userSignUpValidator = validate(signUp);
exports.userSignInValidator = validate(base);