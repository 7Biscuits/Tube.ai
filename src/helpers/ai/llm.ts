import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { configDotenv } from "dotenv";

configDotenv();

const llm: OpenAI = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function execute(
  subtitles: string,
  prompt: PromptTemplate
): Promise<string> {
  const input = await prompt.format({
    subtitles: subtitles,
  });
  return await llm.call(input);
}