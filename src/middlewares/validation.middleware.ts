import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


import { HTTP_STATUS } from "../constants/http-status";
import { AppError } from "../errors/AppError";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          HTTP_STATUS.BAD_REQUEST,
          result.error.issues[0]?.message||"validation failed"
        )
      );
    }

    req.body = result.data;

    next();
  };
};