import { PromptTemplate } from "langchain/prompts";

export const questionPrompt = PromptTemplate.fromTemplate(`
Use the following pieces of context to answer the question at the end.
Understand the question the person is asking you and do not tell him that you can't get the context of the video whatsoever. Generate a simple response to the simple question you'll be asked.
----------------
CHAT HISTORY: {chatHistory}
----------------
CONTEXT: {context}
----------------
QUESTION: {question}
----------------
Helpful Answer:
`);

export const questionGeneratorTemplate = PromptTemplate.fromTemplate(`
Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
----------------
CHAT HISTORY: {chatHistory}
----------------
FOLLOWUP QUESTION: {question}
----------------
Standalone question:
`);