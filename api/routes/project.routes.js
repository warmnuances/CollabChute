const express = require("express");
const ProjectController = require("../controllers/project.controllers.js");
const jwtValidator = require("../helpers/jwt.js") 
const {projectValidator } = require("../helpers/project.validator.js")

const router = express.Router();

router.post("/add",projectValidator,jwtValidator, ProjectController.ADD_PROJECT);

module.exports = router;