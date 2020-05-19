/** Library Imports **/
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { ErrorMiddleware } = require('./utils/errors');

/** Utils Import **/
require("./utils/db");
const { shouldCompress, _corsOption } = require("./utils/config");


/** Routes Import **/
const userRoutes = require('./api/routes/user.routes.js');
const projectRoutes = require('./api/routes/project.routes.js');
const fileRoutes = require('./api/routes/file.routes.js');

console.log("ENV:", process.env.NODE_ENV)

/** Constants**/
const APIVERSION = "/v1/api";

/** Initialisation **/
const app = express();

const corsOption = _corsOption;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({
  threshold: 0,
  filter: shouldCompress
}))
app.use(cookieParser())
app.use(cors(corsOption))


/** Set View Engine as React **/
/** You need to run npm run build to create a production build of react in client **/
const viewEnginePath = path.join(__dirname,'view')
app.use(express.static(viewEnginePath));



app.use(APIVERSION + '/user', userRoutes);
app.use(APIVERSION + '/project', projectRoutes);
app.use(APIVERSION + '/file', fileRoutes);


app.get("/test", (req,res, next) => {
  res.cookie('JWT', 'john doe', { maxAge: 900000, httpOnly: true });
  res.json("Cookie tester")
});


//Cleanup
app.use(ErrorMiddleware);


/** Routes **/
app.get('*',(_, res) => {
  res.sendFile(viewEnginePath);
})



module.exports = app;