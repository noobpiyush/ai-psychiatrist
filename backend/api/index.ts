
import express from "express";

import { RootRouter } from "./routes";

import cors from  "cors"
import { db } from "./db/db";

import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // No trailing slash
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

try {
    db();
} catch (error) {
    console.log("error", error);
}

app.get("/health", (req, res) =>{
    res.send("hii there");
})

app.use("/api/v1",RootRouter)

app.listen(3000);