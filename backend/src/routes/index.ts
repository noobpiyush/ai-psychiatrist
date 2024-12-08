import express from "express";
import router from "./mentalHealth";
import { userRouter } from "./user";


export const RootRouter = express.Router();


RootRouter.use("/user", userRouter);

RootRouter.use("/user/chat", router);

// RootRouter.use("/job",jobRouter);