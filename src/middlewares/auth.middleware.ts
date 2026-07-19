import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwt.service";
import { HTTP_STATUS } from "../constants/http-status";
import { AppError } from "../errors/AppError";
import { AUTH_MESSAGES } from "../constants/message";


export class AuthMiddleware {
 constructor(
   private readonly jwtService: JwtService
 ){}
 authenticate(req:Request,res:Response,next:NextFunction):void {
   try{
      const token = req.cookies?.accessToken;
      if(!token) {
         throw new AppError(
          HTTP_STATUS.UNAUTHORIZED,
          AUTH_MESSAGES.UNAUTHORIZED
        );
      }
      const payload = this.jwtService.verifyAccessToken(token);
      req.user = payload;
      next()
   }catch(err){
     next(new AppError(HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.INVALID_TOKEN))
   }
 }
}