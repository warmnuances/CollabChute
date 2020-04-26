/** functions for commonly used errors
 * **/

exports.resourceNotFound = (res,msg) => {
  return(
    res.status(404).json({
      "Error": msg || "Resource Not Found!"
    })
  )
}
exports.badRequesterror = (res,msg) => {
  return(
    res.status(400).json({
      "Error": msg || "Bad Request!"
    })
  )
}

exports.unauthorisedError = (res,msg) => {
  return(
    res.status(401).json({
      "Error": msg || "Authentication Failed!"
    })
  )
}

exports.internalServerError = (res,msg) => {
  return(
    res.status(500).json({
      "Error": msg || "Internal Server Error"
    })
  )
}