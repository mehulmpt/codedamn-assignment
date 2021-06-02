import { createFile, getAllFile, runCode } from "./controller";
import { isAuth } from "./../../middlewares/isAuth";
import express from "express";

const router = express.Router();

router.get("/start", isAuth, runCode);
router.get("/", isAuth, getAllFile);
router.post("/create", isAuth, createFile);

export default router;
