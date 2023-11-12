import { YoutubeTranscript } from "youtube-transcript";

export async function getSubtitles(videoId: string): Promise<string> {
  try {
    const captions = await YoutubeTranscript.fetchTranscript(videoId);

    let subtitles = "";
    for (let i = 0; i < captions.length; i++) {
      subtitles += " " + captions[i].text;
    }
    return subtitles;
  } catch (error) {
    return `Error fetching subtitles: ${error}`;
  }
}

export async function checkSubtitles(videoId: string): Promise<boolean> {
  const captions = await YoutubeTranscript.fetchTranscript(videoId);
  if (captions.length <= 0) return false;
  return true;
}