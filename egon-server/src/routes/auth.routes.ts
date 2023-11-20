import { Router } from "express";
import { registerUser, logIn, checkUser } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logIn);
router.route("/checkUser").get(checkUser);

export default router;