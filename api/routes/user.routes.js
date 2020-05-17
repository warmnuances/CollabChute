const express = require("express");
const jwtValidator = require("../helpers/jwt");

const router = express.Router();
const CustomerController = require("../controllers/user.controllers");
const { userSignUpValidator, userSignInValidator } = require("../helpers/user.validator.js");

router.post("/test",jwtValidator, CustomerController.USER_TEST_JWT);
router.post("/renew",jwtValidator, CustomerController.USER_TEST_JWT);
router.post("/signin",userSignInValidator,CustomerController.USER_SIGN_IN);
router.post("/signup",userSignUpValidator, CustomerController.USER_SIGN_UP);


module.exports = router;