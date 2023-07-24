import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

export const applyMiddleware = (app: express.Application) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // server accepts cookies from the client
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};
