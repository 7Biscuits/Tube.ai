import { Router } from "express";
import { getSummary } from "./controllers/getSummary";
import { askQuestion } from "./controllers/askQuestion";

export const router = Router();

router.route("/summarize/:videoId").get(getSummary);
router.route("/questions/:videoId").get(askQuestion);