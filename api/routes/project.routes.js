const express = require("express");
const ProjectController = require("../controllers/project.controllers.js");
const jwtValidator = require("../helpers/jwt.js") 
const { projectValidator } = require("../helpers/project.validator.js")

const router = express.Router();

router.post("/add",projectValidator,jwtValidator, ProjectController.ADD_PROJECT);
router.get("/get",jwtValidator, ProjectController.GET_PROJECT_DETAILS);

router.post("/member/add",jwtValidator,ProjectController.ADD_MEMBER);
router.post("/todos/add",jwtValidator,ProjectController.ADD_TODOS);
router.put("/todos/update",jwtValidator,ProjectController.UPDATE_TODOS);

router.patch("/details/update",projectValidator,jwtValidator, ProjectController.UPDATE_DETAILS);
router.post("/chat/create",jwtValidator, ProjectController.CREATE_CHAT_ROOM);


module.exports = router;