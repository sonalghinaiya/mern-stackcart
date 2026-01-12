import { getAIResponse } from "../services/aiService.js";

export const chatWithAI = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await getAIResponse(message);

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    next(error);
  }
};
