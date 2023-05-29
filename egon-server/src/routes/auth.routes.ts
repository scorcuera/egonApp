import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { logIn } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logIn);

export default router;