import OpenAI from "openai";

const getApiKey = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  return apiKey;
};

export const getOpenAIClient = () => new OpenAI({ apiKey: getApiKey() });

export const getOpenAIModel = () => process.env.OPENAI_MODEL || "gpt-4o-mini";
