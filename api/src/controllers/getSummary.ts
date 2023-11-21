import { Request, Response } from "express";
import { getAudio } from "../helpers/getAudio";
import { checkCaptions, getCaptions } from "../helpers/getCaptions";
import { getVideoInfo } from "../helpers/getVideoInfo";
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
    const textFilePath = join(__dirname, "../captions", `${videoId}.txt`);
    const { title, channel } = await getVideoInfo(videoId);

    if (await checkCaptions(videoId)) {
      const captions = await getCaptions(videoId);
      const summary = await generateSummary(captions, summarizePrompt);

      res.json({
        title: title,
        channel: channel,
        summary: summary,
      });
      
      if (!existsSync(textFilePath))
        writeFileSync(textFilePath, captions, "utf-8");
      return;
    }
    const audioFilePath = join(__dirname, "../downloads", `${videoId}.mp3`);

    if (!existsSync(audioFilePath)) await getAudio(videoId); // downloads audio if audio doesn't exist.
    const transcribedText = await extractText(audioFilePath);
    const summary = await generateSummary(transcribedText, summarizePrompt);

    res.json({
      title: title,
      channel: channel,
      summary: summary,
    });

    if (!existsSync(textFilePath))
      writeFileSync(textFilePath, transcribedText, "utf-8");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};