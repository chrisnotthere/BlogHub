import cors from 'cors';
import express from 'express';

export const applyMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());
};
