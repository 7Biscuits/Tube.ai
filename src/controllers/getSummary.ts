import { Request, Response } from "express";
import { getAudio } from "../helpers/getAudio";
import { checkSubtitles, getSubtitles } from "../helpers/getSubtitles";
import { extractText } from "../helpers/ai/whisper";
import { execute } from "../helpers/ai/llm";
import { summarizePrompt } from "../helpers/ai/prompts/summarize";
import { join } from "path";
import { existsSync } from "fs";

export const getSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  const videoId = req.params.videoId;
  try {
    if (await checkSubtitles(videoId)) {
      const subtitles = await getSubtitles(videoId);
      res.send(await execute(subtitles, summarizePrompt));
      return;
    }
    const audioFilePath = join(
      __dirname,
      "../downloads",
      `${req.params.videoId}.mp3`
    );
    // download audio if audio doesn't exist.
    if (!existsSync(audioFilePath)) await getAudio(videoId);

    const tranribedText = await extractText(audioFilePath);
    res.send(await execute(tranribedText, summarizePrompt));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};