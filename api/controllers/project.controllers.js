const Project = require("../models/project.models");
const User = require("../models/user.models");
const ErrorHelper = require("../../utils/errors");
const { admin ,acl } = require("../helpers/Permissions");

exports.ADD_PROJECT = async (user,req,res, _) => {

  const { email } = user;
  const { project_details , project_name } = req.body;

  (!email || !project_details || !project_name ) && ErrorHelper.badRequesterror(res);


  // await User.findOneAndUpdate({email: email},{$push: {roles: "admin"}});

  await User.findOne({email: email}, (err, user)=> {
    if(err) ErrorHelper.badRequesterror(res)
    if(user){
      user.roles.push({project_name: project_name ,permissions: admin.getAccessList() })
    }
    user.save((err) => {
      if(err) ErrorHelper.internalServerError(res,err);
    })
  })

  const project = new Project({
    created_by: email,
    project_details: project_details || "dasdasdsada",
    project_name: project_name,
    member_count: 1,
    chatGroups: [{
      "room_name": "Main Chat"
    }]
  })

  await project.save()
  .then(resource => {
    res.status(201).json(
      {
        resource: resource,
        message: "Success Created"
      }
    )
  }).catch(err => {
    const errmsg = err.message
    ErrorHelper.internalServerError(res,errmsg)
  })
}

exports.UPDATE_DETAILS = (user,req,res, _) => {
  //TODO: Create a model for Project Permissions
  const { email } = user;

  const { project_name, project_details } =  req.body;

  (!project_name || !project_details) && ErrorHelper.badRequesterror(res)

  User.findOne({email: email}, async (err,user)=> {
    if(err) ErrorHelper.badRequesterror(res)

    let valid = false;
    let authorised = {};
    if(user){
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === project_name
      })
      valid = acl.validateAccess('details','write',authorised)
    }

    (authorised === {}) && ErrorHelper.notImplemented(res);

    if(valid){

      await Project.findOneAndUpdate(
        {project_name: authorised.project_name},
        {project_details: project_details}
        ,(err, result) => {
          if(err) ErrorHelper.resourceNotFound(res);
          console.log("results: ", result)
          res.status(200).send(result)
        })
    }
    else{
      ErrorHelper.unauthorisedError(res, "You do not have permission to update details")
    }
  })
}

exports.CREATE_CHAT_ROOM = (user,req,res, _) => {
  const { email } = user;
  const { room_name, belongs_to } = req.body;

  (!belongs_to || !room_name) && ErrorHelper.badRequesterror(res);

  User.findOne({email: email}, async (err, user) => {
  
    if(err) ErrorHelper.badRequesterror(res)
    
    let valid = false;
    let authorised = {};
    if(user){
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === belongs_to
      })
      valid = acl.validateAccess('chatGroup','create',authorised)
    }else{
      ErrorHelper.unauthorisedError(res);
    }

    (authorised === {}) && ErrorHelper.notImplemented(res);

    if(valid){
      const chat = {
        room_name: room_name
      }
      Project.findOneAndUpdate({project_name: belongs_to},{ $push: { chatGroups: chat } }, (err, project) =>{
        err && ErrorHelper.internalServerError(res, err);
        console.log(err)
        res.status(201).send({
          message: "Chat Group Created"
        })
      })

     
    }else{
      ErrorHelper.unauthorisedError(res,"You are unauthorised!");
    }
  })
}

exports.DELETE_PROJECT = (req,res) => {
  res.send("Add Project")
}
