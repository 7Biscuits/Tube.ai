import { getInfo } from "ytdl-core";

interface IVideoInfo {
  title: string;
  channel: string;
}

export async function getVideoInfo(videoId: string): Promise<IVideoInfo> {
  const videoInfo = await getInfo(videoId);
  return {
    title: videoInfo.videoDetails.title,
    channel: videoInfo.videoDetails.author.name,
  };
}