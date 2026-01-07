import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (message) => {
  const response = await openai.chat.completions.create({
    // model: "gpt-4o-mini",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant for an e-commerce backend API"
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
  console.log("--", response.choices[0].message.content);
  return response.choices[0].message.content;
};
