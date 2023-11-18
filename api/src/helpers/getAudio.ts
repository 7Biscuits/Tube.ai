import ytdl, { getInfo, chooseFormat } from "ytdl-core";
import { createWriteStream } from "fs";
import { join } from "path";

export async function getAudio(videoId: string): Promise<void> {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const videoInfo = await getInfo(videoUrl);
  const audioFormat = chooseFormat(videoInfo.formats, {
    quality: "highestaudio",
  });

  const audioFilePath = join(__dirname, "../downloads", `${videoId}.mp3`);
  const audioStream = ytdl(videoUrl, { quality: audioFormat.itag });
  audioStream.pipe(createWriteStream(audioFilePath));
}