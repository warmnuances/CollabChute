const express = require("express");
const router = express.Router();
const { 
  uploadConfig,
  ADD_FILE_TO_PROJECT, 
  LIST_ALL_FILES_IN_PROJECT,
  DOWNLOAD_FILE
} = require("../controllers/file.controllers.js"); 
const jwtValidator = require('../helpers/jwt.js');

router.post("/upload",uploadConfig.any(),ADD_FILE_TO_PROJECT);
router.get("/list", jwtValidator,LIST_ALL_FILES_IN_PROJECT);
router.get("/download", DOWNLOAD_FILE);


module.exports = router;