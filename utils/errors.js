/** functions for commonly used errors
 * **/

exports.resourceNotFound = (next,err) => {
  err = err || "Resource Not Found!"
  return next([err,404])
}
exports.badRequesterror = (next,err) => {
  err = err || "Bad Request!"
  return next([err,400])
}

exports.unauthorisedError = (next,err) => {
  err = err || "Authentication Failed!"
  return next([err,401])
}

exports.internalServerError = (next,err) => {
  err = err || "Internal Server Error"
  return next([err,500])
}

exports.notImplemented = (next,err) => {
  err = err || "Not Implemented"
  return next([err,501])
}
exports.resourceConflict = (next,err) => {
  err = err || "Resource Conflict"
  return next([err,409])
}

exports.ErrorMiddleware = (error,req,res,next) => {
  if(!res.headerSet){
    return res.status(error[1]).send({
      "Error": error[0]
    })
  }
  
}
