import { Request,Response } from 'express';
import User, { IUser } from '../models/User.model';
import * as ErrorHelper from '../utils/error';

interface ICreateUser{
  email: IUser['email'];
  password: IUser['password'];
  name: IUser['name'];
  username: IUser['username']
}

export const logIn = (req:Request, res:Response) => {
  res.send("Hello World")
}

export const signUp = async (req:Request, res:Response) => {
  const { email,password,name,username } = req.body
  const user = await User
    .create({
      email,
      password,
      name,
      username
    })
    .then((resource:IUser) => {
      console.log(resource)
      res.status(201).json(
        {
          message: "Success Created"
        }
      )
    })
    .catch((err:Error) => {
      const errmsg:string = err.message
      ErrorHelper.internalServerError(res,errmsg)
    })
}