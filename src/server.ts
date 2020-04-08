// import http from 'http';
import App from './app';
import {Request, Response} from 'express';
import userRoute from './routes/user.routes';
import DbHelper from './config/database';

import SwaggerUI from 'swagger-ui-express';
import SwaggerDoc from './public/swagger.json';

const APIVERSION = "/api/v1";

const app = new App({
  setReactAsViewEngine: true
}).app;

DbHelper.init();


app.use(APIVERSION + '/user',userRoute);
/** TO-DO: Update Swagger **/
app.use(APIVERSION + '/swagger',  SwaggerUI.serve, SwaggerUI.setup(SwaggerDoc))


app.listen(5001)