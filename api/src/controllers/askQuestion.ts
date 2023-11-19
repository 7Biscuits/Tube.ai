import { Request, Response } from "express";
import { getAnswer } from "../helpers/ai/llm";
import { join } from "path";
import { getVideoId } from "../helpers/getVideoId";

export const askQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { videoId, question } = req.body;
    const textFilePath = join(__dirname, "../captions", `${videoId}.txt`);
    const answer = await getAnswer(textFilePath, question);
    res.send(answer);
  } catch (error: any) {
    res.status(500).send({ message: "An error occured", error: error });
  }
};