const Project = require("../models/project.models");
const User = require("../models/user.models");
const ErrorHelper = require("../../utils/errors");
const { admin ,acl , userRole } = require("../helpers/Permissions");

exports.ADD_PROJECT = (user,req,res, next) => {

  const { email } = user;
  const { project_details , project_name } = req.body;

  if(!email || !project_details || !project_name ) return ErrorHelper.badRequesterror(next);


  // await User.findOneAndUpdate({email: email},{$push: {roles: "admin"}});
  
  //TODO: change statement, its being executed twice
  User.findOne({email: email}, async (err, user)=> {
    if(err) return ErrorHelper.badRequesterror(next)
    if(user){
      user.roles.push({project_name: project_name ,permissions: admin.getAccessList() })

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
        
        res.status(201).json({
          email: user.email,
          id: user._id,
          roles: user.roles
        })
      }).catch(err => {
        const errmsg = err.message
        return ErrorHelper.internalServerError(next,errmsg)
      })
    }
    user.save((err) => {
      if(err) return ErrorHelper.internalServerError(next,err);
    })
  })
}

exports.GET_PROJECT_DETAILS = async (user,req,res,next) => {
  const { email } = user;
  const { project_name } = req.query;

  if(!user) return ErrorHelper.unauthorisedError(next, "User Not Found");

  if(!project_name) return ErrorHelper.badRequesterror(next);

  await User.findOne({email:email}, async(err, user) => {
    if(err){
      return ErrorHelper.resourceNotFound(next);
    }
    else{
      const roles = user.roles
      
      if(roles){
        const valid = await roles.some(role => role.project_name === project_name)
        if(valid){
          await Project.findOne({project_name: project_name}, (err, project) => {
            if(err) return ErrorHelper.resourceNotFound(next);
        
            res.status(200).send(project)
          })
        }
        else{
          return ErrorHelper.unauthorisedError(next, "You do not have permission");
        }
      }
    }
  })
}
exports.ADD_MEMBER = async (claims,req,res,next) => {

  const { email } = claims;
  const { project_name, new_user_email } = req.body;

  if(!project_name) return ErrorHelper.badRequesterror(next);
  if(!claims) return Error.unauthorisedError(next);
  
  try{
    const user = await User.findOne({email: email})
    if(user){
      let valid = false;
      let authorised = {};
  
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === project_name
      })
      
      if(!authorised){
        return ErrorHelper.resourceNotFound(next);
      }
      else{
        valid = acl.validateAccess('members','create',authorised)

        if(valid){
          let newUser = await User.findOne({email: new_user_email},(err, user) => {
            if(err) return ErrorHelper.internalServerError(next);
          })
          if(newUser){
            let exist = newUser.roles.some(role => role.project_name === project_name);
            if(exist){
              return ErrorHelper.resourceConflict(next);
            }
            else{
              await User.updateOne({email: newUser.email},{$push: 
                {roles: 
                  {
                    project_name: project_name, 
                    permissions: userRole.getAccessList()
                  }
              }})
              Project.findOneAndUpdate(
                {project_name: project_name},
                {$push: {members: newUser.email}},
                {new: true}
                ,(err, result) => {
                  if(err) ErrorHelper.resourceNotFound(next);
                  return res.status(200).send(result.members)
              })
            }

          }else {
            return ErrorHelper.badRequesterror(next);
          }
        }
        else{
          return ErrorHelper.unauthorisedError(next);
        }
      } 
    }
    else{
      return ErrorHelper.unauthorisedError(next)
    }
  }
  catch(err){
    return ErrorHelper.internalServerError(next, err)
  }

}
exports.ADD_TODOS = async (claims,req,res,next) => {
  const { email } = claims;
  const { project_name, todo } = req.body;

  if(!project_name || !todo) return ErrorHelper.badRequesterror(next);
  if(!claims) return Error.unauthorisedError(next);

  try{
    const user = await User.findOne({email: email})
    if(user){
      let valid = false;
      let authorised = {};
  
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === project_name
      })
     
      if(!authorised){
        return ErrorHelper.resourceNotFound(next);
      }
      else{
        valid = acl.validateAccess('todos','create',authorised)

        if(valid){
          Project.findOneAndUpdate(
            {project_name: project_name},
            {$push: {todo: {
              todo: todo,
              done: false
            }}},
            {new: true}
            ,(err, result) => {
              if(err) ErrorHelper.resourceNotFound(next);
              return res.status(200).send(result.todo)
              
          })
        }
        else {
            return ErrorHelper.unauthorisedError(next);
          }
        }
    }
    else{
      return ErrorHelper.resourceNotFound(next);
    } 
  }
  catch(err){
    return ErrorHelper.internalServerError(next, err)
  }
}
exports.UPDATE_TODOS = async (claims,req,res,next) => {
  const { email } = claims;
  const { project_name, todo } = req.body;

  if(!project_name || !todo) return ErrorHelper.badRequesterror(next);
  if(!claims) return Error.unauthorisedError(next), "User not found";

  try{
    const user = await User.findOne({email: email})
    if(user){
      let valid = false;
      let authorised = {};
      
      const projectRoles = user.roles;
     
      authorised = projectRoles.find(role => {
        return role.project_name === project_name
      })
      
      if(authorised === undefined){
        return ErrorHelper.resourceNotFound(next, "Unable to find role");
      }
      else{

        valid = acl.validateAccess('todos','update',authorised)

        if(valid){
          const project = await Project.findOne({project_name: project_name});
          if(project){
            const todoItems = project.todo;
            const newTodos = todoItems.map(item => {
              if(item._id.toString() === todo._id){
                return todo
              }else{
                return item
              }
            });
     
            Project.updateOne(
              {project_name: project_name},
              {todo: newTodos},
              (err, project) => {
                if(err) ErrorHelper.internalServerError(next,err);
                res.status(201).send({
                  message: "Successfully updated",
                  new_todo: newTodos
                })
            })
          }else{
            return ErrorHelper.resourceNotFound(next,"does not exists");
          }

        }
        else {
            return ErrorHelper.unauthorisedError(next, "You do not have permission");
        }
      }
    }
    else{
      
      return ErrorHelper.resourceNotFound(next);
    } 
  }
  catch(err){
    return ErrorHelper.internalServerError(next, err)
  }
}



// TODO: For Admin Side of things
exports.UPDATE_DETAILS = (user,req,res, next) => {
  //TODO: Create a model for Project Permissions
  const { email } = user;

  const { project_name, project_details } =  req.body;

  (!project_name || !project_details) && ErrorHelper.badRequesterror(next)

  User.findOne({email: email}, async (err,user)=> {
    if(err) ErrorHelper.badRequesterror(next)

    let valid = false;
    let authorised = {};
    if(user){
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === project_name
      })
      valid = acl.validateAccess('details','update',authorised)
    }

    (authorised === {}) && ErrorHelper.notImplemented(next);

    if(valid){

     Project.findOneAndUpdate(
        {project_name: authorised.project_name},
        {project_details: project_details}
        ,(err, result) => {
          if(err) ErrorHelper.resourceNotFound(next);
          res.status(200).send(result)
        })
    }
    else{
      ErrorHelper.unauthorisedError(next, "You do not have permission to update details")
    }
  })
}
exports.CREATE_CHAT_ROOM = (user,req,res, next) => {
  const { email } = user;
  const { room_name, belongs_to } = req.body;

  (!belongs_to || !room_name) && ErrorHelper.badRequesterror(next);

  User.findOne({email: email}, async (err, user) => {
  
    if(err) ErrorHelper.badRequesterror(next)
    
    let valid = false;
    let authorised = {};
    if(user){
      const projectRoles = user.roles;
      authorised = projectRoles.find(role => {
        return role.project_name === belongs_to
      })
      valid = acl.validateAccess('chatGroup','create',authorised)
    }else{
      ErrorHelper.unauthorisedError(next);
    }

    (authorised === {}) && ErrorHelper.notImplemented(next);

    if(valid){
      const chat = {
        room_name: room_name
      }
      Project.findOneAndUpdate({project_name: belongs_to},{ $push: { chatGroups: chat } }, (err, project) =>{
        err && ErrorHelper.internalServerError(next, err);
        res.status(201).send({
          message: "Chat Group Created"
        })
      })

     
    }else{
      ErrorHelper.unauthorisedError(next,"You are unauthorised!");
    }
  })
}



