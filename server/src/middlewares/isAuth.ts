/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "./../components/User/model";
import { Forbidden } from "./../errors/Forbidden";
import { AuthRequest } from "./../types/AuthRequest";
import { TokenType } from "./../types/TokenType";
import { formatUser } from "./../utils/formatUser";

export const isAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      throw new Forbidden();
    }

    const token = header.split(" ")[1];
    if (!token.trim().length) {
      throw new Forbidden();
    }

    const isValid = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenType;

    const user = await User.findOne(isValid.id);

    if (!user) {
      throw new Forbidden();
    }

    req.user = formatUser(user);

    next();
  } catch (error) {
    return next(error);
  }
};
