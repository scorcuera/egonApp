import { Router } from "express";
import { getAllClaps } from "../controllers/claps.controller";

let router = Router();

router.route("/").get(getAllClaps);

export default router;