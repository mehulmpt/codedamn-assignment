import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "./components/Auth/routes";
import UserRouter from "./components/User/routes";
import FileRouter from "./components/File/routes";
import { NotFound } from "./errors/NotFound";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/file", FileRouter);

router.get("/healthCheck", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound("API", req.originalUrl));
});

export default router;
