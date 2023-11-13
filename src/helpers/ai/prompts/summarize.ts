import { PromptTemplate } from "langchain/prompts";

export const summarizePrompt = PromptTemplate.fromTemplate(`
Given a detailed textual description (captions/subtitles) of a YouTube video's content, generate a concise summary highlighting the key points and main ideas.
Assume you are creating a summary for an audience that wants a quick overview of the video without going through the entire video.
Keep the summary informative, coherent, and relevant to capture the essence of the video.
Do not generate anything other than the summary.
The textual content of the video is {captions}.
`);