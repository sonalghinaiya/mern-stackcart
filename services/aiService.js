// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (message) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
  const result = await model.generateContent(message);
  return result.response.text();
};

// const gemini_api_key = process.env.GEMINI_API_KEY;
// const googleAI = new GoogleGenerativeAI(gemini_api_key);
// const geminiConfig = {
//   temperature: 0.9,
//   topP: 1,
//   topK: 1,
//   maxOutputTokens: 4096,
// };

// const geminiModel = googleAI.getGenerativeModel({
//   model: "gemini-pro",
//   geminiConfig,
// });

// export const getAIResponse = async (message) => {
//   try {
//     const prompt = "Tell me about google.";
//     const result = await geminiModel.generateContent(prompt);
//     const response = result.response;
//     console.log(response.text());
//   } catch (error) {
//     console.log("response error", error);
//   }
// };

// export const getAIResponse = async (message) => {
//   const response = await openai.chat.completions.create({
//     // model: "gpt-4o-mini",
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant for an e-commerce backend API"
//       },
//       {
//         role: "user",
//         content: message,
//       },
//     ],
//   });
//   console.log("--", response.choices[0].message.content);
//   return response.choices[0].message.content;
// };
