import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../services/auth.service";

interface MyRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = verifyJwtToken(token, secret);
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(403).json({ message: "Invalid token." });
    }
  } else {
    return res.status(401).json({ message: "Not authenticated." });
  }
};
