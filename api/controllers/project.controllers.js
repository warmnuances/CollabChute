const Project = require("../models/project.models");
const User = require("../models/user.models");
const ErrorHelper = require("../../utils/errors");

exports.ADD_PROJECT = async (user,req,res,next) => {
  const { email } = user;
  const { project_detail , project_name } = req.body;

  (!email || !project_detail || !project_name ) && ErrorHelper.badRequesterror(res);


  // await User.findOneAndUpdate({email: email},{$push: {roles: "admin"}});

  User.findOne({email: email}, (err, user)=> {
    if(err) ErrorHelper.badRequesterror(res)
    if(user){
      user.roles.push({project_name: project_name ,permissions: ["Admin"]})
    }
    user.save((err) => {
      if(err) ErrorHelper.internalServerError(res,err);
    })
  })


  const project = new Project({
    created_by: email,
    project_detail: project_detail,
    project_name: project_name,
    member_count: 1,
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


  console.log("OBJ", user);
  // res.send("Add Project")
}
exports.DELETE_PROJECT = (req,res) => {
  res.send("Add Project")
}
