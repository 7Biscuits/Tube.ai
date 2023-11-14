import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { configDotenv } from "dotenv";

configDotenv();

export async function extractText(filePath: string): Promise<string> {
  const loader = new OpenAIWhisperAudio(filePath, {
    clientOptions: { apiKey: process.env.OPENAI_API_KEY },
  });
  const docs = await loader.load();
  return docs[0].pageContent;
}