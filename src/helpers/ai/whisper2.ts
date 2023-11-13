/* Not using this code in the main code but keeping it as a reference. */

import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { AudioTranscriptLoader } from "langchain/document_loaders/web/assemblyai";
import { configDotenv } from "dotenv";

configDotenv();

async function generateSummary(audioFilePath: string): Promise<string> {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const chain = loadQAStuffChain(llm);

  const loader = new AudioTranscriptLoader(
    {
      audio_url: audioFilePath,
      language_code: "en_us",
    },
    {
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    }
  );
  const docs = await loader.load();

  const response = await chain.call({
    input_documents: docs,
    question: "Generate a summary highlighting the key points and main ideas. Assume you are creating a summary for an audience that wants a quick overview of the video without going through the entire video.",
  });
  return response.text;
};