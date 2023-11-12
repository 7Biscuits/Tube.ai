import { Router } from "express";
import { getSummary } from "./controllers/getSummary";

export const router = Router();

router.route("/summarize/:videoId").get(getSummary);