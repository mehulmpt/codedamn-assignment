/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
import { User } from "./../components/User/model";

export const generateAccessToken = (user: User) => {
  const payload = {
    id: user.id,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken };
};

export const generateRefreshToken = (user: User) => {
  const payload = {
    id: user.id,
  };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

  return { refreshToken };
};
