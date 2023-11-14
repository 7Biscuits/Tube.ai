import { YoutubeTranscript } from "youtube-transcript";

export async function getCaptions(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const captions = transcript.map(c => c.text).join(" ");
    return captions;
  } catch (error) {
    return `Error fetching captions: ${error}`;
  }
}

export async function checkCaptions(videoId: string): Promise<boolean> {
  try {
    await YoutubeTranscript.fetchTranscript(videoId);
    return true;
  } catch (e) {
    return false;
  }
}