import { Request, Response } from "express";
import { getAudio } from "../helpers/getAudio";
import { checkCaptions, getCaptions } from "../helpers/getCaptions";
import { extractText } from "../helpers/ai/whisper";
import { generateSummary } from "../helpers/ai/llm";
import { summarizePrompt } from "../helpers/ai/prompts/summarize";
import { join } from "path";
import { existsSync, writeFileSync } from "fs";

export const getSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const videoId = req.body.videoid;
    console.log(videoId);
    const textFilePath = join(__dirname, "../captions", `${videoId}.txt`);

    if (await checkCaptions(videoId)) {
      const captions = await getCaptions(videoId);
      console.log("got captions");
      const summary = await generateSummary(captions, summarizePrompt);
      console.log(summary);
      res.send(summary);
      if (!existsSync(textFilePath))
        writeFileSync(textFilePath, captions, "utf-8");
      return;
    }
    const audioFilePath = join(__dirname, "../downloads", `${videoId}.mp3`);

    if (!existsSync(audioFilePath)) await getAudio(videoId); // downloads audio if audio doesn't exist.
    console.log("starting transcribing.")
    const transcribedText = await extractText(audioFilePath);
    const summary = await generateSummary(transcribedText, summarizePrompt);
    console.log(summary);
    res.send(summary);
    if (!existsSync(textFilePath))
      writeFileSync(textFilePath, transcribedText, "utf-8");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};