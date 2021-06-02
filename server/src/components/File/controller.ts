import { BadRequest } from "./../../errors/BadRequest";
import { NextFunction } from "express";
import { Response } from "express";
import { AuthRequest } from "./../../types/AuthRequest";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { FormatFiles } from "../../utils/FormatFiles";

export const createFile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const fileName: string = req.body.fileName || "";
    console.log(req.body);

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    if (!fileName.trim().length) {
      throw new BadRequest("file name cannot be null");
    }

    if (fs.existsSync(path.join(__dirname, `../../uploads/${user.email}`))) {
    } else {
      fs.mkdirSync(path.join(__dirname, `../../uploads/${user.email}`));
    }
    fs.writeFileSync(
      path.join(__dirname, `../../uploads/${user.email}/${fileName}`),
      ""
    );

    res.status(200).json({
      success: true,
      file: FormatFiles([fileName])[0],
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllFile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    if (fs.existsSync(path.join(__dirname, `../../uploads/${user.email}`))) {
      const files = fs.readdirSync(
        path.join(__dirname, `../../uploads/${user.email}`)
      );

      res.status(200).json({
        success: true,
        files: FormatFiles(files),
      });
    } else {
      res.status(200).json({
        success: true,
        files: [],
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const runCode = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const userFiles = path.join(__dirname, `/../../uploads/${user.email}`);
    console.log(userFiles);

    console.log(
      `docker run -p 5000:5500 -v ${userFiles}:/app -d node-code:latest`
    );
    exec(
      `docker run -p 5000:5500 -v ${userFiles}:/app -d node-code:latest`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("STD OUT", stdout);
        console.log("STD ERR", stderr);
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
