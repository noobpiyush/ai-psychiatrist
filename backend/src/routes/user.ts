import { UserModel } from "../models/User";
import express from "express";

import jwt from "jsonwebtoken";
import { SigninBody, SignupBody } from "../zod-schemas/user";

export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const result = SignupBody.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        issues: result.error.issues,
      });
      return;
    }

    const { name, email, password } = result.data;

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already taken" });
      return;
    }

    // Create a new user
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(201).json({
      message:
        "Signup successful. Please check your email for the OTP to verify your account.",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const result = SigninBody.safeParse(req.body);

    if (!result.success) {
      res.status(400).send("pls send correct body");
      return;
    }

    const { email, password } = result.data;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the password is correct
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "60h" } // Token valid for 60 hour
    );

    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/check-auth", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized: Invalid token format" });
      return;
    }

    // Verify token
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

    // Extract email from token payload
    const email = decodedToken.email as string;
    if (!email) {
      res.status(400).json({ error: "Invalid token: Email not found" });
      return;
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "All OK", user });
  } catch (error) {
    console.error("Error in /check-auth:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
