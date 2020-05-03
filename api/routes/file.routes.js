const express = require("express");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const ErrorHelper = require("../../utils/errors");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage })

router.post("/upload",upload.single('profile'), (req,res) => {
  res.send()
});

router.get("/upload",(req,res) => {
  let fileArray = [];
  const directoryPath = path.join(path.dirname(process.mainModule.filename), 'uploads');
  console.log(directoryPath)


  fs.readdir(directoryPath, (err, files) => {
    if(err){
      ErrorHelper.internalServerError(res,"Error Getting Files")
    }
    else{
      files.forEach(file => {
        fileArray.push(file);
      })
      res.status(200).json({
        "files": fileArray
      })
    }
  })

  // res.json({
  //   "files": fileArray
  // })
})

module.exports = router;