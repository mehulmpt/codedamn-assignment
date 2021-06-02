import express from "express";
import { isAuth } from "./../../middlewares/isAuth";
import { getUserById, MeUser, updateUser } from "./controller";

const router = express.Router();

router.get("/me", isAuth, MeUser);
router.get("/:id", isAuth, getUserById);
router.patch("/", isAuth, updateUser);

export default router;
