import express from 'express';
import * as userController from '../controller/User.controller';
import { userSignUpValidator, userSignInValidator } from '../middlewares/validator';


const router = express.Router();

router.post('/login',userSignInValidator,userController.logIn)
router.post('/signup',userSignUpValidator, userController.signUp)

export default router;
