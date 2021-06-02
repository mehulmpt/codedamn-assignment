import { NextFunction, Response } from "express";
import { BadRequest } from "./../../errors/BadRequest";
import { AuthRequest } from "./../../types/AuthRequest";
import { formatUser } from "./../../utils/formatUser";

export const MeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    res.status(200).json({
      success: true,
      user: formatUser(user),
    });
  } catch (error) {
    return next(error);
  }
};
