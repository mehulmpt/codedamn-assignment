/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { compare } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "./../../errors/BadRequest";
import { InputError } from "./../../errors/InputError";
import { NotFound } from "./../../errors/NotFound";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./../../utils/generateToken";
import { toMapErrors } from "./../../utils/toMapErrors";
import { User } from "./../User/model";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email: string = req.body.email || "";
    const password: string = req.body.password || "";

    if (!email.trim().length) {
      throw new BadRequest("email  cannot be empty");
    }

    if (!password.trim().length) {
      throw new BadRequest("password cannot be empty");
    }

    let user: User | undefined = undefined;
    user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFound("user", email);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new BadRequest("invalid email or password");
    }

    const { accessToken } = generateAccessToken(user);
    const { refreshToken } = generateRefreshToken(user);

    const transformedUser = <User>classToPlain(user);

    res.json({
      success: true,
      user: transformedUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User();

    user.email = req.body.email;
    user.password = req.body.password;

    const errors = await validate(user);

    if (errors.length) {
      const { errorMap } = toMapErrors(errors);
      throw new InputError(errorMap);
    }

    await user.save();

    const { accessToken } = generateAccessToken(user);
    const { refreshToken } = generateRefreshToken(user);
    const newUser = <User>classToPlain(user);

    res.status(200).json({
      success: true,
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};
