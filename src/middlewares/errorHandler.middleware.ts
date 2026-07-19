import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { GENERAL_MESSAGES } from "../constants/message";
import { HTTP_STATUS } from "../constants/http-status";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: GENERAL_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
