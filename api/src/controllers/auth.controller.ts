import { Request, Response } from "express";
import {
  findUserByUsername,
  createUser,
  validatePassword,
  generateJwtToken,
  verifyJwtToken,
  findUserById,
} from "../services/auth.service";

// Register a new user, storing their username and hashed password
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const users = await findUserByUsername(username);
    if (users.length > 0) {
      return res.status(400).json({ message: "Username already exists." });
    }

    await createUser(username, password);

    res.json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Log in a user, creating a new JWT for them
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const users = await findUserByUsername(username);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const user = users[0];
    const match = await validatePassword(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const secret = process.env.JWT_SECRET;
    const token = generateJwtToken(user.id, secret);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 3600000,
    });

    res.json({ message: "User logged in successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Log out a user by clearing their JWT from the cookie
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ message: "User logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Retrieve a user's information using their JWT
export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    const secret = process.env.JWT_SECRET;
    let userId;

    try {
      const decoded = verifyJwtToken(token, secret);
      userId = decoded.userId;
    } catch (error) {
      return res.status(403).json({ message: "Invalid token." });
    }

    const users = await findUserById(userId);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = users[0];

    res.json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
