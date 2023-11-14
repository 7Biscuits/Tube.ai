import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import { readFileSync } from "fs";
import { RunnableBranch, RunnableSequence } from "langchain/schema/runnable";
import { questionPrompt, questionGeneratorTemplate } from "./prompts/question";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { LLMChain } from "langchain/chains";
import { formatDocumentsAsString } from "langchain/util/document";
import { configDotenv } from "dotenv";

configDotenv();

export const getAnswer = async (
  filePath: string,
  question: string
): Promise<string> => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const text = readFileSync(filePath, "utf8");

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  const vectorStore = await HNSWLib.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
  );
  const retriever = vectorStore.asRetriever();

  const serializeChatHistory = (
    chatHistory: string | Array<string>
  ): string => {
    if (Array.isArray(chatHistory)) {
      return chatHistory.join("\n");
    }
    return chatHistory;
  };

  const memory = new BufferMemory({
    memoryKey: "chatHistory",
  });

  const handleProcessQuery = async (input: {
    question: string;
    context: string;
    chatHistory?: string | Array<string>;
  }): Promise<string> => {
    const chain = new LLMChain({
      llm: model,
      prompt: questionPrompt,
      outputParser: new StringOutputParser(),
    });

    const { text } = await chain.call({
      ...input,
      chatHistory: serializeChatHistory(input.chatHistory ?? ""),
    });

    await memory.saveContext(
      {
        human: input.question,
      },
      {
        ai: text,
      }
    );
    return text;
  };

  const answerQuestionChain = RunnableSequence.from([
    {
      question: (input: {
        question: string;
        chatHistory?: string | Array<string>;
      }) => input.question,
    },
    {
      question: (previousStepResult: {
        question: string;
        chatHistory?: string | Array<string>;
      }) => previousStepResult.question,
      chatHistory: (previousStepResult: {
        question: string;
        chatHistory?: string | Array<string>;
      }) => serializeChatHistory(previousStepResult.chatHistory ?? ""),
      context: async (previousStepResult: {
        question: string;
        chatHistory?: string | Array<string>;
      }) => {
        const relevantDocs = await retriever.getRelevantDocuments(
          previousStepResult.question
        );
        const serialized = formatDocumentsAsString(relevantDocs);
        return serialized;
      },
    },
    handleProcessQuery,
  ]);

  const generateQuestionChain = RunnableSequence.from([
    {
      question: (input: {
        question: string;
        chatHistory: string | Array<string>;
      }): string => input.question,
      chatHistory: async (): Promise<string> => {
        const memoryResult = await memory.loadMemoryVariables({});
        return serializeChatHistory(memoryResult.chatHistory ?? "");
      },
    },
    questionGeneratorTemplate,
    model,
    {
      question: (previousStepResult: { text: string }) =>
        previousStepResult.text,
    },
    answerQuestionChain,
  ]);

  const branch = RunnableBranch.from([
    [
      async () => {
        const memoryResult = await memory.loadMemoryVariables({});
        const isChatHistoryPresent = !memoryResult.chatHistory.length;

        return isChatHistoryPresent;
      },
      answerQuestionChain,
    ],
    [
      async (): Promise<boolean> => {
        const memoryResult = await memory.loadMemoryVariables({});
        const isChatHistoryPresent =
          !!memoryResult.chatHistory && memoryResult.chatHistory.length;

        return isChatHistoryPresent;
      },
      generateQuestionChain,
    ],
    answerQuestionChain,
  ]);

  const fullChain = RunnableSequence.from([
    {
      question: (input: { question: string }) => input.question,
    },
    branch,
  ]);

  const answer = await fullChain.invoke({
    question: question,
  });
  return answer;
};

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (
  captions: string,
  prompt: PromptTemplate
): Promise<string> => {
  const input = await prompt.format({
    captions: captions,
  });
  return await llm.call(input);
};