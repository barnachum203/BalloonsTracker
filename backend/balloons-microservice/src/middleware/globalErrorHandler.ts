import { NextFunction, Request, Response } from 'express'
import { resultCodes } from '../enums/resultCodes'

export const globalErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {    
    if (error) {      
      let statusCode = 500
      if (error?.statusCode) {
          statusCode = error.statusCode
        }

    return res.status(statusCode).json({
      result: resultCodes.ERROR,
      error: {
        name: error.name,
        message: error.message
      }
    })
  } else {
    console.log("next error");

    next()
  }
}