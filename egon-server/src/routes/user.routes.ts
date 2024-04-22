import Router from "express";
import { getAllUsers } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/session.middleware";

const router = Router();

router.route("/").get(isAdmin, getAllUsers);

export default router;