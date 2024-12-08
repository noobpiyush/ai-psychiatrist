import express from "express";
import axios from "axios";
import { UserModel } from "../models/User";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const router = express.Router();
const HUGGING_FACE_API = process.env.HUGGING_FACE_API;

router.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    // Verify and decode the token
    let decodedToken: jwt.JwtPayload | null = null;
    try {
      decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as jwt.JwtPayload;
    } catch (err) {
      res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
      return;
    }

    // Extract email or other data from the decoded token
    const email: string = decodedToken.email as string;
    // Fetch user from DB
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Validate input
    const trimmedUserMessage = userMessage;

    // Improved prompt structure
    const customPrompt = `
        You are a helpful and empathetic counselor. Your job is to provide clear, actionable advice to users based on the problems they share.
        User: ${trimmedUserMessage}
        Counselor:
        `;

    // Call Hugging Face API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct", // Use a suitable model
      {
        inputs: customPrompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.2,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    console.log(typeof response.data);

    // Extract and clean the AI's response
    const fullGeneratedText = response.data[0]?.generated_text || "";

    // Match text after "Counselor:" (captures everything, including newlines)
    const aiMessageMatch = fullGeneratedText.match(/Counselor:(.*)/s);

    // Extract the full message or provide a fallback if no match
    const aiMessage = aiMessageMatch
      ? aiMessageMatch[1].trim() // Extract everything after "Counselor:"
      : "I'm here to help. Can you share more about what's troubling you?";

    // Optional: Limit length only if absolutely necessary
    // const safeAiMessage = aiMessage.slice(0, 500); // Only use this if there's a hard limit
    const safeAiMessage = aiMessage; // No length limit

    // Save chat log
    user.chatLogs?.push({ message: userMessage, isUser: true });
    user.chatLogs?.push({ message: safeAiMessage, isUser: false });
    await user.save();

    // Send full AI response
    res.json({ aiMessage: safeAiMessage });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ message: "Error processing your request" });
  }
});

export default router;
