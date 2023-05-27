import { Router } from "express";
import { getAllClaps } from "../controllers/claps.controller";
import { getAllSentClaps } from "../controllers/claps.controller";
import { getAllReceivedClaps } from "../controllers/claps.controller";
import { sendClaps } from "../controllers/claps.controller";

let router = Router();

router.route("/").get(getAllClaps);
router.route("/sentClaps/:id").get(getAllSentClaps);
router.route("/receivedClaps/:id").get(getAllReceivedClaps);
router.route("/").post(sendClaps);

export default router;