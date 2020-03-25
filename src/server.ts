// import http from 'http';
import App from './app';
import Path from 'path';
import {Request, Response} from 'express';

const app = new App({}).getInstance();

app.get('/', (req:Request,res:Response) => {
  res.send("hello World");
})

app.listen(5000)