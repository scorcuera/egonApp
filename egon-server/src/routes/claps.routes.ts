import { Router } from "express";
import { getAllClaps } from "../controllers/claps.controller";
import { getAllSentClaps } from "../controllers/claps.controller";
import { getAllReceivedClaps } from "../controllers/claps.controller";
import { sendClaps } from "../controllers/claps.controller";
import { isAdmin, isUser } from "../middlewares/session.middleware";

const router = Router();

router.route("/").get(isAdmin, getAllClaps);
router.route("/sentClaps/:id").get(isUser, getAllSentClaps);
router.route("/receivedClaps/:id").get(isUser, getAllReceivedClaps);
router.route("/").post(isUser, sendClaps);

export default router;