import { Router } from "express";
import { getAllClaps } from "../controllers/claps.controller";
import { getAllSentClaps } from "../controllers/claps.controller";

let router = Router();

router.route("/").get(getAllClaps);
router.route("/:id").get(getAllSentClaps);

export default router;