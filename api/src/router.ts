import { Router } from "express";
import { getSummary } from "./controllers/getSummary";
import { askQuestion } from "./controllers/askQuestion";

export const router = Router();
router.route("/summarize").get(getSummary);
router.route("/question").post(askQuestion);