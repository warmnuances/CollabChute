const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/user.controllers");
const { userSignUpValidator, userSignInValidator } = require("../helpers/user.validator.js");

router.post("/signin",userSignInValidator, CustomerController.USER_SIGN_IN);
router.post("/signup",userSignUpValidator, CustomerController.USER_SIGN_UP);

module.exports = router;