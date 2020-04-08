import { body, validationResult, ValidationChain} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/** All validations functions for users.
 *  Validations should be straight forward and check the validity of input
 *  No side effects e.g API Calls
 *  Compose validations to reuse commonly used validations 
 * **/

const base:Array<ValidationChain> = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({min:8})
    .trim() 
    .escape(),
]

const signUp:Array<ValidationChain> = base.concat([
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

const validate = (validations:Array<ValidationChain>) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors:Array<object>= []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    res.status(422).json({ errors: extractedErrors });
  };
};


/** Exports **/
export const userSignUpValidator = validate(signUp)
export const userSignInValidator = validate(base)

