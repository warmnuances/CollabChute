const path = require('path');
const fs = require('fs');
const ErrorHelper = require("../../utils/errors");
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

/** GCS Variables **/
const bucketName = "collabchute";
const projectId = "comrs-267303";
const keyFileName = path.join(path.dirname(process.mainModule.filename),"utils","comrs-8d4974d0386b.json");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//   }
// })

//10 MB maximum file size
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits:{
     fileSize: 10 * 1024 * 1024
  }
})

const GCS = new Storage({projectId,keyFileName})

/** Controller Logic **/
exports.uploadConfig = upload;

exports.ADD_FILE_TO_PROJECT = async (req,res,next) => {
  //TODO: RBAC for files


  const { project_name } = req.query;
  if(!project_name) ErrorHelper.badRequesterror(next);
  const fileBuffer = req.files[0];

  if(fileBuffer){ 
    const gcsname = Date.now() + fileBuffer.originalname;
    const file = await GCS.bucket(bucketName).file(project_name + '/'+gcsname);

    const fileStream = file.createWriteStream({
      metadata: {
        contentType: fileBuffer.mimetype
      },
      resumable: true
    })

    fileStream.on('error', (err) => {
      if(err) ErrorHelper.internalServerError(res, err.message);
    })

    fileStream.on('finish', (err) => {
      if(err) ErrorHelper.internalServerError(res, err.message);
    })

    fileStream.end(fileBuffer.buffer);

    res.status(200).json({
      "message": "uploaded Successfully",
      "fileName": gcsname
    });
  }
  else{
    ErrorHelper.badRequesterror(res, "File Not Supported")
  }
} 
// exports.LIST_FILES_IN_PROJECT = async (req,res,next) => {
//   const { project_name } = req.query;

//   console.log("Cookies: ", req.cookies);


  

// }

exports.LIST_ALL_FILES_IN_PROJECT = async (user,req,res,next) => {
  const { project_name } = req.query;
  console.log("Name:", project_name);


  // if(!user){} ErrorHelper.unauthorisedError(next);

  // const targetRole = user.roles.find(role => role.project_name == project_name);
  // console.log("Target", targetRole)

  // console.log(project_name);
  


  if(project_name){
    const [files] = await GCS.bucket(bucketName).getFiles({prefix: project_name})
    const fileNames = files.map(file => file.name);

    res.send(fileNames);
  }
  else{
    ErrorHelper.badRequesterror(next);
  }  
}

exports.DOWNLOAD_FILE = async(req,res,next) => {
  const { project_name, file_name } = req.query;

  const fileName = file_name.split("/")[1];
  const cwd = path.join(__dirname, '../../', 'temp');

  const options = {
    destination: cwd + fileName,
  };

  if(project_name){
    const [files] = await GCS.bucket(bucketName).getFiles({prefix: project_name})

    files.forEach(async file => {
      let currentFile = file.name.split("/")[1];
      if(currentFile === fileName){
        await GCS.bucket(bucketName).file(file.name).download(options);
        res.download(cwd + fileName, fileName, (err) => {
          if(err) ErrorHelper.internalServerError(next);
        })
      }
    })
    
  }
  else{
    ErrorHelper.badRequesterror(next);
  }  
}