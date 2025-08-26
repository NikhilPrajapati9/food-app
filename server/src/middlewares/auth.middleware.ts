import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.ts";
import { User, type IUserDocument } from "../models/user.model.ts";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error(
        "ACCESS_TOKEN_SECRET environment variable is not defined"
      );
    }
    const decoded = jwt.verify(token, secret);
    let decodedToken: { _id: string } | null = null;
    if (typeof decoded === "object" && decoded !== null && "_id" in decoded) {
      decodedToken = decoded as { _id: string };
    } else {
      throw new ApiError(401, "Invalid token payload");
    }
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Invalid access token";
    throw new ApiError(401, errorMessage);
  }
};
