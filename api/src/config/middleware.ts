import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";

// set images folder as destination for multer
export const upload = multer({ dest: 'images/' });

export const applyMiddleware = (app: express.Application) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // server accepts cookies from the client
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use('/images', express.static('images')); // serve images from images folder
};
