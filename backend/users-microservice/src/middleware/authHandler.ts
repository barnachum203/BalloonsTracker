import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { passwordSalt } from '../utils/crypto'
import { logger } from '../utils/logger'

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization
  const token = authHeader && authHeader.split(' ')[1]
  logger.info(`authHeader: ${authHeader}`);
  logger.info(`token: ${token}`);
  
  jwt.verify(token, passwordSalt, (err: any, user: any) => {
    if (err) {
        logger.error(`jwt not verified. `)
        logger.error(err.message)     

      return res.status(401).json(`Error: ${err.message}`);
    }else{
        // req.user = user
        logger.info("auth handled")
        next()
    }
  })
}