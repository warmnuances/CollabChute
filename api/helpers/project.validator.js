const { body, validationResult } = require('express-validator');

const project = [
  body('project_name')
  .trim()
  .escape(),
  body('project_details')
  .trim()
  .escape()
]

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

exports.projectValidator = validate(project);