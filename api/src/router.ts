import { Router } from "express";
import { getSummary } from "./controllers/getSummary";
import { askQuestion } from "./controllers/askQuestion";
import { json } from "body-parser";

export const router = Router();

router.use(json());

router.route("/summarize").post(getSummary);
router.route("/question").post(askQuestion);
router.get("/hello", (_, res) => {
  res.send("hello world!");
});