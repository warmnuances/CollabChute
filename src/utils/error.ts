/** functions for commonly used errors
 * **/
import { Response } from 'express';

export const resourceNotFound = (res:Response,msg?:string) => {
  return(
    res.status(404).json({
      "Error": msg || "Resource Not Found!"
    })
  )
}

export const internalServerError = (res:Response,msg?:string|Error) => {
  return(
    res.status(500).json({
      "Error": msg || "Internal Server Error"
    })
  )
}
