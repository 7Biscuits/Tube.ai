import { getInfo } from "ytdl-core";

interface IVideoInfo {
  title: string;
  channel: string;
}

export async function getVideoInfo(videoUrl: string): Promise<IVideoInfo> {
  const videoInfo = await getInfo(videoUrl);
  return {
    title: videoInfo.videoDetails.title,
    channel: videoInfo.videoDetails.author.name,
  };
}