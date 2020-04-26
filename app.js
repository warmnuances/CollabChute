/** Library Imports **/
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

/** Utils Import **/
require("../server/utils/db");
const { shouldCompress } = require("./utils/config");


/** Routes Import **/
const userRoutes = require('./api/routes/user.routes.js');

/** Constants**/
const APIVERSION = "/v1/api";

/** Initialisation **/
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression({
  threshold: 0
}))

/** Set View Engine as React **/
/** You need to run npm run build to create a production build of react in client **/
const viewEnginePath = path.join(__dirname,'view')
app.use(express.static(viewEnginePath));



/** Routes **/
app.get('*',(_, res) => {
  res.sendFile(viewEnginePath);
})

app.use(APIVERSION + '/user', userRoutes);

app.get("/test", (req,res, next) => {
  res.json("Hello")
});

module.exports = app;