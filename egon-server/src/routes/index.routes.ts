import { Router } from "express";
import { indexWelcome } from "../controllers/index.controller";

let router = Router();

router.route("/").get(indexWelcome);

export default router;