import { Request, Response } from 'express';

export const createComment = async (req: Request, res: Response) => {
  console.log('createComment')
  console.log(req.body)
  res.send({ data: 'createComment', message: 'from comment table' });
};
