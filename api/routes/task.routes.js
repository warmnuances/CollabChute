const express = require("express");
const jwtValidator = require("../helpers/jwt.js")

const router = express.Router();
const tasksController = require("../controllers/tasks.controller");

router.post("/add/:projectid", tasksController.AddTask);