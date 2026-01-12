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
//   return response.choices[0].message.content;
// };
