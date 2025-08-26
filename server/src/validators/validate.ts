import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.ts";
import type { NextFunction, Request, Response } from "express";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors.array().map((err) =>
    extractedErrors.push({
      [err.type]: err.msg,
    })
  );

  // 422: Unprocessable Entity
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
