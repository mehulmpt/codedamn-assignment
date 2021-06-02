import express from "express";
import { isAuth } from "./../../middlewares/isAuth";
import { MeUser } from "./controller";

const router = express.Router();

router.get("/me", isAuth, MeUser);

export default router;
